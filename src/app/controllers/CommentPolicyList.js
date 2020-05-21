import { Op } from 'sequelize';
import List from '../models/List';

class CommentPolicyList {
  async store(req, res) {
    const { list_id, allowed_replies } = req.body;

    const list = await List.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: list_id }],
      },
    });

    if (!list) {
      return res
        .status(400)
        .json({ success: false, message: 'Lista não pertence ao usuário.' });
    }

    await list.update({ allowed_replies });
    return res.json({ list });
  }
}

export default new CommentPolicyList();
