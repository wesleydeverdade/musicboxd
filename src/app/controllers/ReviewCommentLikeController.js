import ReviewComment from '../models/ReviewComment';
import User from '../models/User';

class ReviewCommentLikeController {
  async store(req, res) {
    const { comment_id } = req.params;

    const comment = await ReviewComment.findByPk(comment_id);

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode dar like neste comentário!',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await comment.addLike(user)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Comentário recebeu seu Like com sucesso',
    });
  }

  async destroy(req, res) {
    const { comment_id } = req.params;

    const comment = await ReviewComment.findByPk(comment_id);

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode dar like neste comentário!',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await comment.removeLike(user)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Comentário teve seu Like removido com sucesso',
    });
  }
}

export default new ReviewCommentLikeController();
