import { Op } from 'sequelize';
import Review from '../models/Review';
import Album from '../models/Album';
import Spotify from '../services/Spotify';

class ReviewController {
  async index(req, res) {
    return res.json({ ok: req.body });
  }

  async store(req, res) {
    const { spotify_id, content, liked, note } = req.body;
    const albumExists = await Album.findOne({ where: { spotify_id } });

    let album = '';

    if (!albumExists) {
      let spotify = '';

      try {
        spotify = await Spotify.album({ id: spotify_id });
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'Falha de validação (spotify)',
        });
      }

      album = await Album.create({
        spotify_id: spotify.id,
        album_name: spotify.name,
        album_artist: spotify.artists,
        album_genres: spotify.genres,
        album_release_date: spotify.release_date,
      });
    }

    const album_id = album === '' ? albumExists.id : album.id;

    const reviewExists = await Review.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { album_id }],
      },
    });

    if (reviewExists) {
      return res
        .status(400)
        .json({ success: false, message: 'Review já realizado.' });
    }

    const review = await Review.create({
      content,
      note,
      liked,
      user_id: req.userId,
      album_id,
    });

    return res.json({ review });
  }

  async update(req, res) {
    const { review_id, content, liked, note } = req.body;

    const review = await Review.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: review_id }],
      },
    });

    if (!review) {
      return res
        .status(400)
        .json({ success: false, message: 'Review não pertence ao usuário.' });
    }

    await review.update({ content, liked, note });

    return res.json({ review });
  }

  async delete(req, res) {
    const { review_id } = req.body;

    const review = await Review.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: review_id }],
      },
    });

    if (!review) {
      return res
        .status(401)
        .json({ success: false, message: 'Review não encontrado' });
    }

    if (!(await Review.destroy({ where: { id: review_id } })))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });
    return res.json({ success: true, message: 'Review apagado' });
  }
}

export default new ReviewController();
