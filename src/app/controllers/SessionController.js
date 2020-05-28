import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';
import ForgotPasswordMail from '../jobs/ForgotPasswordMail';
import Queue from '../../lib/Queue';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: 'Password does not match' });
    }

    const { id, name, avatar, replies } = user;

    return res.json({
      id,
      name,
      email,
      avatar,
      token: jwt.sign({ id, replies }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }

    const password_reset_token = await bcrypt.hash(
      // random string
      Math.random().toString(36).substring(2),
      8
    );

    const password_reset_expires = new Date();
    // token expires in one hour
    password_reset_expires.setHours(password_reset_expires.getHours() + 1);

    if (
      !(await user.update({ password_reset_token, password_reset_expires }))
    ) {
      return res.status(401).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });
    }

    Queue.add(ForgotPasswordMail.key, {
      email: user.email,
      username: user.username,
      token: password_reset_token,
    });

    return res.json({
      success: true,
      token: password_reset_token,
      message:
        'An email has been sent with instructions on how to change your password',
    });
  }

  async resetPassword(req, res) {
    const { token, email, password } = req.body;

    const user = await User.findOne({
      where: { email, password_reset_token: token },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or token already used',
      });
    }

    if (new Date() >= user.password_reset_expires) {
      return res
        .status(401)
        .json({ success: false, message: 'Token expired, try again' });
    }

    if (await user.checkPassword(password)) {
      return res.status(401).json({
        success: false,
        message: 'Password is the same as previously used',
      });
    }

    if (
      !(await user.update({
        password,
      }))
    ) {
      return res.status(401).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });
    }

    return res.json({
      success: true,
      message: 'Password changed successfully',
    });
  }
}

export default new SessionController();
