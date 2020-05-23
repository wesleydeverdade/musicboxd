import User from '../models/User';
import Album from '../models/Album';
import ReportAlbum from '../models/ReportAlbum';

class ReportAlbumController {
  async store(req, res) {
    const { report_album_id } = req.params;
    const { reason, content } = req.body;

    const album = await Album.findByPk(report_album_id);

    if (!album) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode reportar este álbum!',
      });
    }

    const reportExists = await ReportAlbum.findOne({
      where: { user_id: req.userId, report_album_id },
    });

    if (!reportExists) {
      const user = await User.findByPk(req.userId);
      const [result] = await album.addReport(user);
      const report = await ReportAlbum.findOne({
        where: { id: result.id },
      });
      await report.update({ reason, content });
    }

    return res.json({
      success: true,
      message: 'Álbum reportado com sucesso',
    });
  }
}

export default new ReportAlbumController();
