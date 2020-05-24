import User from '../models/User';
import Review from '../models/Review';
import ReportReview from '../models/ReportReview';

class ReportReviewController {
  async store(req, res) {
    const { report_review_id } = req.params;
    const { reason, content } = req.body;

    const review = await Review.findByPk(report_review_id);

    if (!review) {
      return res.status(400).json({
        success: false,
        message: 'You cannot report this review',
      });
    }

    const reportExists = await ReportReview.findOne({
      where: { user_id: req.userId, report_review_id },
    });

    if (!reportExists) {
      const user = await User.findByPk(req.userId);
      const [result] = await review.addReport(user);
      const report = await ReportReview.findOne({
        where: { id: result.id },
      });
      await report.update({ reason, content });
    }

    return res.json({
      success: true,
      message: 'Review successfully reported',
    });
  }
}

export default new ReportReviewController();
