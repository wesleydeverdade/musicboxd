import User from '../models/User';
import Review from '../models/Review';
import ReviewComment from '../models/ReviewComment';

class CommentReviewController {
  async index(req, res) {
    return res.json(req.body);
  }

  async show(req, res) {
    return res.json(req.body);
  }

  async store(req, res) {
    const { review_id, content } = req.body;

    const review = await Review.findByPk(review_id);

    if (!review) {
      return res
        .status(400)
        .json({ success: false, message: 'Review inválido.' });
    }

    const user = await User.findByPk(req.userId);

    // 0 (anyone can reply), 1 (friends [people YOU follow]), 2 (Only You)
    if (review.user_id !== req.userId) {
      if (review.allowed_replies === 1) {
        const user_review = await User.findByPk(review.user_id);

        if (!(await user_review.hasFollower(user))) {
          return res.json({
            success: false,
            message: 'Apenas quem o dono do review segue pode comentar.',
          });
        }
      } else if (review.allowed_replies === 2) {
        return res.json({
          success: false,
          message: 'Apenas o dono do review pode comentar.',
        });
      }
    }

    const review_comment = await ReviewComment.create({
      content,
      review_id: review.id,
    });

    const [comment] = await review_comment.addComment(user);
    return res.json({ comment });
  }

  async update(req, res) {
    const { content } = req.body;
    const { comment_id } = req.params;

    const comment = await ReviewComment.findByPk(comment_id);

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
        review_comment_id: get_comments.user_review_comments.review_comment_id,
        user_id: get_comments.user_review_comments.user_id,
        createdAt: get_comments.user_review_comments.createdAt,
        updatedAt: get_comments.user_review_comments.updatedAt,
        id: parseInt(comment_id, 10),
      },
    });
  }

  async destroy(req, res) {
    const { comment_id } = req.params;
    let deleted_by = 0;

    const comment = await ReviewComment.findByPk(comment_id);

    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: 'Comentário inválido.' });
    }

    const user = await User.findByPk(req.userId);
    const review = await Review.findByPk(comment.review_id);
    const user_comment = await comment.hasComment(user);

    // only the owner of comment or the owner of review can delete
    if (!user_comment && review.user_id !== req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode apagar este comentário.',
      });
    }

    if (review.user_id === req.userId) deleted_by = 1;

    if (!(await ReviewComment.destroy({ where: { id: comment_id } })))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });
    comment.update({ deleted_by });
    return res.json({ success: true, message: 'Comentário apagado' });
  }
}

export default new CommentReviewController();
