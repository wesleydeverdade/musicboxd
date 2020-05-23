import User from '../models/User';
import List from '../models/List';
import ReportList from '../models/ReportList';

class ReportListController {
  async store(req, res) {
    const { report_list_id } = req.params;
    const { reason, content } = req.body;

    const list = await List.findByPk(report_list_id);

    if (!list) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode reportar esta lista!',
      });
    }

    const reportExists = await ReportList.findOne({
      where: { user_id: req.userId, reported_list_id: report_list_id },
    });

    if (!reportExists) {
      const user = await User.findByPk(req.userId);
      const [result] = await list.addReport(user);
      const report = await ReportList.findOne({
        where: { id: result.id },
      });
      await report.update({ reason, content });
    }

    return res.json({
      success: true,
      message: 'Lista reportada com sucesso',
    });
  }
}

export default new ReportListController();
