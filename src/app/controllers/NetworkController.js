import User from '../models/User';

class NetworkController {
  async store(req, res) {
    const { follow_user_id } = req.params;

    const validUser = await User.findByPk(follow_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode seguir este usuário!',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.addFollower(validUser)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Usuário seguido com sucesso',
    });
  }

  async destroy(req, res) {
    const { follow_user_id } = req.params;

    const validUser = await User.findByPk(follow_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode seguir este usuário!',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.removeFollower(validUser)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Usuário desseguido com sucesso',
    });
  }
}

export default new NetworkController();
