import ReviewComment from '../models/ReviewComment';
import User from '../models/User';

class ReviewCommentLikeController {
  async store(req, res) {
    const { comment_id } = req.params;

    const comment = await ReviewComment.findByPk(comment_id);

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "You can't like this comment",
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await comment.addLike(user)))
      return res.status(400).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Comment received your Like successfully',
    });
  }

  async destroy(req, res) {
    const { comment_id } = req.params;

    const comment = await ReviewComment.findByPk(comment_id);

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "You can't like this comment",
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await comment.removeLike(user)))
      return res.status(400).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Comment had your Like removed successfully',
    });
  }
}

export default new ReviewCommentLikeController();
