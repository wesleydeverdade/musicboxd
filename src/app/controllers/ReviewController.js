import { Op } from 'sequelize';
import Review from '../models/Review';
import Album from '../models/Album';
import Tag from '../models/Tag';
import Spotify from '../services/Spotify';

class ReviewController {
  async index(req, res) {
    return res.json(req.body);
    // const { page = 1, spotify_id, user_id } = req.query;
    // /* filters */
    // const options_review = { where: {} };
    // const options_album = { where: {} };
    // if (user_id) options_review.where.user_id = user_id;
    // if (spotify_id) options_album.where.spotify_id = spotify_id;
    // const reviews = await Review.findAll({
    //   where: options_review.where,
    //   limit: 20,
    //   offset: (page - 1) * 20,
    //   attributes: ['id', 'content', 'note', 'liked', 'user_id'],
    //   include: [
    //     {
    //       model: Album,
    //       as: 'review_album',
    //       attributes: [
    //         'album_name',
    //         'album_artists',
    //         'album_release_date',
    //         'album_genres',
    //       ],
    //       where: options_album.where,
    //     },
    //     {
    //       association: 'tags',
    //       attributes: ['name'],
    //     },
    //   ],
    // });
    // return res.json(reviews);
  }

  async show(req, res) {
    return res.json(req.body);
  }

  async store(req, res) {
    const { spotify_id, content, liked, note, tags } = req.body;
    const albumExists = await Album.findOne({ where: { spotify_id } });

    let album = '';

    if (!albumExists) {
      let spotify = '';

      try {
        spotify = await Spotify.album({ id: spotify_id });
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'Validation failure (spotify)',
        });
      }

      album = await Album.create({
        spotify_id: spotify.id,
        album_name: spotify.name,
        album_artists: spotify.artists,
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
        .json({ success: false, message: 'Review already carried out' });
    }

    const review = await Review.create({
      content,
      note,
      liked,
      user_id: req.userId,
      album_id,
      allowed_replies: req.allowedReplies,
    });

    if (tags && tags.length > 0) {
      tags.forEach(async (val) => {
        const [tag] = await Tag.findOrCreate({ where: { name: val } });

        await review.addTag(tag);
      });
      // insert tags on return instead a new query only to take the relationship
      review.dataValues.tags = tags;
    }

    return res.json({ review });
  }

  async update(req, res) {
    const { content, liked, note, tags } = req.body;
    const { review_id } = req.params;

    const review = await Review.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: review_id }],
      },
    });

    if (!review) {
      return res.status(400).json({
        success: false,
        message: 'Review does not belong to the user',
      });
    }

    await review.update({ content, liked, note });

    // removing old tags
    await review.removeTags(await review.getTags());

    // insert all tags
    if (tags && tags.length > 0) {
      tags.forEach(async (val) => {
        const [tag] = await Tag.findOrCreate({ where: { name: val } });

        await review.addTag(tag);
      });
      // insert tags on return instead a new query only to take the relationship
      review.dataValues.tags = tags;
    }

    return res.json({ review });
  }

  async destroy(req, res) {
    const { review_id } = req.params;

    const review = await Review.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: review_id }],
      },
    });

    if (!review) {
      return res
        .status(401)
        .json({ success: false, message: 'Review not found' });
    }

    if (!(await Review.destroy({ where: { id: review_id } })))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });
    return res.json({ success: true, message: 'Review deleted' });
  }
}

export default new ReviewController();
