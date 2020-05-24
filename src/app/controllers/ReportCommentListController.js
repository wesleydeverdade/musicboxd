import User from '../models/User';
import ListComment from '../models/ListComment';
import ReportCommentList from '../models/ReportCommentList';

class ReportCommentListController {
  async store(req, res) {
    const { report_list_comment_id } = req.params;
    const { reason, content } = req.body;

    const list_comment = await ListComment.findByPk(report_list_comment_id);

    if (!list_comment) {
      return res.status(400).json({
        success: false,
        message: 'You cannot report this comment',
      });
    }

    const reportCommentExists = await ReportCommentList.findOne({
      where: {
        user_id: req.userId,
        report_list_comment_id,
      },
    });

    if (!reportCommentExists) {
      const user = await User.findByPk(req.userId);
      const [result] = await list_comment.addReport(user);
      const report = await ReportCommentList.findOne({
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

export default new ReportCommentListController();
