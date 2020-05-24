import ListComment from '../models/ListComment';
import User from '../models/User';

class ListCommentLikeController {
  async store(req, res) {
    const { comment_id } = req.params;

    const comment = await ListComment.findByPk(comment_id);

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "You can't like this comment",
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await comment.addLike(user)))
      return res.json({
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

    const comment = await ListComment.findByPk(comment_id);

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "You can't like this comment",
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await comment.removeLike(user)))
      return res.json({
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

export default new ListCommentLikeController();
