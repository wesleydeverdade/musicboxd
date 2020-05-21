import Album from '../models/Album';
import User from '../models/User';
import Spotify from '../services/Spotify';

class WishlistController {
  async store(req, res) {
    const { spotify_id } = req.params;
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
        album_artists: spotify.artists,
        album_genres: spotify.genres,
        album_release_date: spotify.release_date,
      });
    }

    if (album === '') album = albumExists;

    const user = await User.findByPk(req.userId);

    if (!(await album.addUser(user)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Album adicionado a sua wishlist com sucesso',
    });
  }

  async destroy(req, res) {
    const { spotify_id } = req.params;

    const album = await Album.findOne({ where: { spotify_id } });
    const user = await User.findByPk(req.userId);

    if (!album)
      return res.json({
        success: false,
        message: 'Álbum não encontrado! Tente novamente mais tarde!',
      });

    if (!(await album.removeUser(user)))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Álbum removido da sua wishlist com sucesso',
    });
  }

  async makePublic(req, res) {
    const public_wishlist = true;

    const user = await User.findByPk(req.userId);

    if (!(await user.update({ public_wishlist })))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Wishlist foi alterada para pública.',
    });
  }

  async makePrivate(req, res) {
    const public_wishlist = false;

    const user = await User.findByPk(req.userId);

    if (!(await user.update({ public_wishlist })))
      return res.json({
        success: false,
        message:
          'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      });

    return res.json({
      success: true,
      message: 'Wishlist foi alterada para privada.',
    });
  }
}

export default new WishlistController();
