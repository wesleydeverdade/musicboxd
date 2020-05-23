import User from '../models/User';
import ReviewComment from '../models/ReviewComment';
import ReportCommentReview from '../models/ReportCommentReview';

class ReportCommentReviewController {
  async store(req, res) {
    const { report_comment_review_id } = req.params;
    const { reason, content } = req.body;

    const review_comment = await ReviewComment.findByPk(
      report_comment_review_id
    );

    if (!review_comment) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode reportar este comentário!',
      });
    }

    const reportCommentExists = await ReportCommentReview.findOne({
      where: {
        user_id: req.userId,
        reported_review_comment_id: report_comment_review_id,
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
      message: 'Comentário reportado com sucesso',
    });
  }
}

export default new ReportCommentReviewController();
