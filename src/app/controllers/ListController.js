import { Op } from 'sequelize';
import List from '../models/List';
import Album from '../models/Album';
import ListAlbum from '../models/ListAlbum';
import Tag from '../models/Tag';

class ListController {
  /* async index(req, res) {
    return res.json(req.body);
  } */

  /* async show(req, res) {
    return res.json(req.body);
  } */

  async store(req, res) {
    const {
      name,
      description,
      public_list,
      ranked_list,
      albums,
      tags,
    } = req.body;

    // validação para verificar se dentro do que vem de álbum tem spotify_id

    const list = await List.create({
      name,
      description,
      public: public_list,
      ranked_list,
      user_id: req.userId,
      allowed_replies: req.allowedReplies,
    });

    albums.forEach(async (val, index) => {
      const { note, spotify_id } = val;
      const album_order = index;
      const album = await Album.findOne({
        where: { spotify_id },
      });

      if (album) {
        const [result_add_album] = await list.addAlbum(album);
        const list_album = await ListAlbum.findOne({
          where: { id: result_add_album.id },
        });
        await list_album.update({ album_order, note });
      }
    });
    // insert albums on return instead a new query only to take the relationship
    list.dataValues.albums = albums;

    if (tags && tags.length > 0) {
      tags.forEach(async (val) => {
        const [tag] = await Tag.findOrCreate({ where: { name: val } });

        await list.addTag(tag);
      });
      // insert tags on return instead a new query only to take the relationship
      list.dataValues.tags = tags;
    }

    return res.json(list);
  }

  async update(req, res) {
    const {
      name,
      description,
      public_list,
      ranked_list,
      albums,
      tags,
    } = req.body;
    const { list_id } = req.params;

    const list = await List.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: list_id }],
      },
    });

    if (!list) {
      return res
        .status(401)
        .json({ success: false, message: 'List does not belong to the user' });
    }

    await list.update({ name, description, public: public_list, ranked_list });
    // removing old albums
    await list.removeAlbums(await list.getAlbums());

    albums.forEach(async (val, index) => {
      const { note, spotify_id } = val;
      const album_order = index;
      const album = await Album.findOne({
        where: { spotify_id },
      });

      if (album) {
        const [result_add_album] = await list.addAlbum(album);
        const list_album = await ListAlbum.findOne({
          where: { id: result_add_album.id },
        });
        await list_album.update({ album_order, note });
      }
    });
    // insert albums on return instead a new query only to take the relationship
    list.dataValues.albums = albums;

    // removing old tags
    await list.removeTags(await list.getTags());

    // insert all tags
    if (tags && tags.length > 0) {
      tags.forEach(async (val) => {
        const [tag] = await Tag.findOrCreate({ where: { name: val } });

        await list.addTag(tag);
      });
      // insert tags on return instead a new query only to take the relationship
      list.dataValues.tags = tags;
    }

    return res.json(list);
  }

  async destroy(req, res) {
    const { list_id } = req.params;

    const list = await List.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: list_id }],
      },
    });

    if (!list) {
      return res
        .status(401)
        .json({ success: false, message: 'List not found' });
    }

    if (!(await List.destroy({ where: { id: list_id } })))
      return res.status(503).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });
    return res.json({ success: true, message: 'List deleted' });
  }
}

export default new ListController();
