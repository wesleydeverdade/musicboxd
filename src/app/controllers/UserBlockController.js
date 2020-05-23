import User from '../models/User';

class UserBlockController {
  async store(req, res) {
    const block_user_id = parseInt(req.params.block_user_id, 10);

    if (block_user_id === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode bloquear a si mesmo!',
      });
    }

    const validUser = await User.findByPk(block_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode bloquear este usuário!',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.addBlock(validUser)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Usuário bloqueado com sucesso',
    });
  }

  async destroy(req, res) {
    const block_user_id = parseInt(req.params.block_user_id, 10);

    if (block_user_id === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode desbloquear a si mesmo!',
      });
    }

    const validUser = await User.findByPk(block_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode desbloquear este usuário!',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.removeBlock(validUser)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Usuário desbloqueado com sucesso',
    });
  }
}

export default new UserBlockController();
