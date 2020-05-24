import User from '../models/User';
import ReportUser from '../models/ReportUser';

class ReportUserController {
  async store(req, res) {
    const { report_user_id } = req.params;
    const { reason, content } = req.body;

    const reported = await User.findByPk(report_user_id);

    if (!reported) {
      return res.status(400).json({
        success: false,
        message: 'You cannot report this user',
      });
    }

    const reportExists = await ReportUser.findOne({
      where: { user_id: req.userId, report_user_id },
    });

    if (!reportExists) {
      const user = await User.findByPk(req.userId);
      const [result] = await user.addReport(reported);
      const report = await ReportUser.findOne({
        where: { id: result.id },
      });
      await report.update({ reason, content });
    }

    return res.json({
      success: true,
      message: 'User successfully reported',
    });
  }
}

export default new ReportUserController();
