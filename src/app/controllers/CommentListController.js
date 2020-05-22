import User from '../models/User';
import List from '../models/List';
import ListComment from '../models/ListComment';

class CommentListController {
  async index(req, res) {
    return res.json(req.body);
  }

  async show(req, res) {
    return res.json(req.body);
  }

  async store(req, res) {
    const { list_id, content } = req.body;

    const list = await List.findByPk(list_id);

    if (!list) {
      return res
        .status(400)
        .json({ success: false, message: 'Lista inválido.' });
    }

    const user = await User.findByPk(req.userId);

    // 0 (anyone can reply), 1 (friends [people YOU follow]), 2 (Only You)
    if (list.user_id !== req.userId) {
      if (list.allowed_replies === 1) {
        const user_list = await User.findByPk(list.user_id);

        if (!(await user_list.hasFollower(user))) {
          return res.json({
            success: false,
            message: 'Apenas quem o dono da lista segue pode comentar.',
          });
        }
      } else if (list.allowed_replies === 2) {
        return res.json({
          success: false,
          message: 'Apenas o dono da lista pode comentar.',
        });
      }
    }

    const list_comment = await ListComment.create({
      content,
      list_id: list.id,
    });

    const [comment] = await list_comment.addComment(user);

    return res.json({ comment });
  }

  async update(req, res) {
    const { content } = req.body;
    const { comment_id } = req.params;

    const comment = await ListComment.findByPk(comment_id);

    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: 'Comentário inválido.' });
    }

    const user = await User.findByPk(req.userId);

    if (!(await comment.hasComment(user))) {
      return res.status(400).json({
        success: false,
        message: 'Comentário não pertence ao usuário.',
      });
    }

    await comment.update({ content });
    const [get_comments] = await comment.getComments();

    return res.json({
      comment: {
        list_comment_id: get_comments.user_list_comments.list_comment_id,
        user_id: get_comments.user_list_comments.user_id,
        createdAt: get_comments.user_list_comments.createdAt,
        updatedAt: get_comments.user_list_comments.updatedAt,
        id: parseInt(comment_id, 10),
      },
    });
  }

  async destroy(req, res) {
    const { comment_id } = req.params;
    let deleted_by = 0;

    const comment = await ListComment.findByPk(comment_id);

    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: 'Comentário inválido.' });
    }

    const user = await User.findByPk(req.userId);
    const list = await List.findByPk(comment.list_id);
    const user_comment = await comment.hasComment(user);

    // only the owner of comment or the owner of list can delete
    if (!user_comment && list.user_id !== req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode apagar este comentário.',
      });
    }

    if (list.user_id === req.userId) deleted_by = 1;

    if (!(await ListComment.destroy({ where: { id: comment_id } })))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });
    comment.update({ deleted_by });
    return res.json({ success: true, message: 'Comentário apagado' });
  }
}

export default new CommentListController();
