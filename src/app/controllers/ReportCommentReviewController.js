import User from '../models/User';
import ReviewComment from '../models/ReviewComment';
import ReportCommentReview from '../models/ReportCommentReview';

class ReportCommentReviewController {
  async store(req, res) {
    const { report_review_comment_id } = req.params;
    const { reason, content } = req.body;

    const review_comment = await ReviewComment.findByPk(
      report_review_comment_id
    );

    if (!review_comment) {
      return res.status(400).json({
        success: false,
        message: 'You cannot report this comment',
      });
    }

    const reportCommentExists = await ReportCommentReview.findOne({
      where: {
        user_id: req.userId,
        report_review_comment_id,
      },
    });

    if (!reportCommentExists) {
      const user = await User.findByPk(req.userId);
      const [result] = await review_comment.addReport(user);
      const report = await ReportCommentReview.findOne({
        where: { id: result.id },
      });
      await report.update({ reason, content });
    }

    return res.json({
      success: true,
      message: 'Comment successfully reported',
    });
  }
}

export default new ReportCommentReviewController();
