import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const users = await User.findAll({
      where: {},
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'location',
        'website',
        'bio',
        'people_section',
        'first_favorite_album',
        'second_favorite_album',
        'third_favorite_album',
        'fourth_favorite_album',
        'fifth_favorite_album',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required().min(4),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ success: false, message: 'Falha de validação' });
    }

    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: 'Usuário já existe' });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required().min(4),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      first_name: Yup.string(),
      last_name: Yup.string(),
      location: Yup.string(),
      website: Yup.string(),
      bio: Yup.string(),
      people_section: Yup.boolean(),
      first_favorite_album: Yup.string(),
      second_favorite_album: Yup.string(),
      third_favorite_album: Yup.string(),
      fourth_favorite_album: Yup.string(),
      fifth_favorite_album: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ success: false, message: 'Falha de validação' });
    }

    const { email, username, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(400)
          .json({ success: false, message: 'Usuário já existe' });
      }
    }

    if (username !== user.username) {
      const usernameExists = await User.findOne({ where: { username } });

      if (usernameExists) {
        return res
          .status(400)
          .json({ success: false, message: 'Username já utilizado' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(401)
        .json({ success: false, message: 'Senha não bate' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ success: false, message: 'Falha de validação' });
    }

    const user = await User.findOne({ where: { id: req.userId } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(req.body.password))) {
      return res
        .status(401)
        .json({ success: false, message: 'Senha não bate' });
    }

    if (!(await User.destroy({ where: { id: req.userId } })))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });
    return res.json({ success: true, message: 'Conta apagada' });
  }
}

export default new UserController();
