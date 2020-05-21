import { Op } from 'sequelize';
import List from '../models/List';
import User from '../models/User';

class ListLikeController {
  async store(req, res) {
    const { list_id } = req.params;

    const validList = await List.findOne({
      where: {
        user_id: { [Op.ne]: req.userId },
        id: { [Op.eq]: list_id },
      },
    });

    if (!validList) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode dar like nesta lista!',
      });
    }

    const list = await List.findByPk(list_id);
    const user = await User.findByPk(req.userId);

    if (!(await list.addUser(user)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Lista recebeu seu Like com sucesso',
    });
  }

  async destroy(req, res) {
    const { list_id } = req.params;

    const validList = await List.findOne({
      where: {
        user_id: { [Op.ne]: req.userId },
        id: { [Op.eq]: list_id },
      },
    });

    if (!validList) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode dar like nesta lista!',
      });
    }

    const list = await List.findByPk(list_id);
    const user = await User.findByPk(req.userId);

    if (!(await list.removeUser(user)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Lista teve seu Like removido com sucesso',
    });
  }
}

export default new ListLikeController();
