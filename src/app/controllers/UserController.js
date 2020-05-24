import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class UserController {
  async index(req, res) {
    return res.json(req.body);
    // const { page = 1 } = req.query;

    // const users = await User.findAll({
    //   where: {},
    //   limit: 20,
    //   offset: (page - 1) * 20,
    //   attributes: [
    //     'id',
    //     'username',
    //     'email',
    //     'first_name',
    //     'last_name',
    //     'location',
    //     'website',
    //     'bio',
    //     'people_section',
    //     'first_favorite_album',
    //     'second_favorite_album',
    //     'third_favorite_album',
    //     'fourth_favorite_album',
    //     'fifth_favorite_album',
    //     'avatar_id',
    //   ],
    //   include: [
    //     {
    //       model: File,
    //       as: 'avatar',
    //       attributes: ['name', 'path', 'url'],
    //     },
    //   ],
    // });

    // return res.json(users);
  }

  async show(req, res) {
    return res.json(req.body);
  }

  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    if (req.body.avatar_id) {
      if (!(await File.findByPk(req.body.avatar_id))) {
        return res
          .status(400)
          .json({ success: false, message: 'Avatar uploaded does not exist' });
      }
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { email, username, oldPassword, avatar_id } = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(400)
          .json({ success: false, message: 'User already exists' });
      }
    }

    if (username !== user.username) {
      const usernameExists = await User.findOne({ where: { username } });

      if (usernameExists) {
        return res
          .status(400)
          .json({ success: false, message: 'Username already used' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(401)
        .json({ success: false, message: 'Password does not match' });
    }

    if (avatar_id) {
      if (!(await File.findByPk(avatar_id))) {
        return res
          .status(400)
          .json({ success: false, message: 'Avatar uploaded does not exist' });
      }
    }

    await user.update(req.body);

    const { id, name, avatar, replies } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

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

  async destroy(req, res) {
    const user = await User.findOne({ where: { id: req.userId } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }

    if (!(await user.checkPassword(req.body.password))) {
      return res
        .status(401)
        .json({ success: false, message: 'Password does not match' });
    }

    if (!(await User.destroy({ where: { id: req.userId } })))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });
    return res.json({ success: true, message: 'Account deleted' });
  }
}

export default new UserController();
