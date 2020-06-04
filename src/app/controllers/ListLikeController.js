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
        message: "You can't like this list",
      });
    }

    const list = await List.findByPk(list_id);
    const user = await User.findByPk(req.userId);

    if (!(await list.addUser(user)))
      return res.status(400).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'List received its Like successfully',
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
        message: "You can't like this list",
      });
    }

    const list = await List.findByPk(list_id);
    const user = await User.findByPk(req.userId);

    if (!(await list.removeUser(user)))
      return res.status(400).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'List had its Like removed successfully',
    });
  }
}

export default new ListLikeController();
