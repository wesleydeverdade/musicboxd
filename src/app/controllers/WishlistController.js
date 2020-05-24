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

    if (album === '') album = albumExists;

    const user = await User.findByPk(req.userId);

    if (!(await album.addUser(user)))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Album successfully added to your wishlist',
    });
  }

  async destroy(req, res) {
    const { spotify_id } = req.params;

    const album = await Album.findOne({ where: { spotify_id } });
    const user = await User.findByPk(req.userId);

    if (!album)
      return res.json({
        success: false,
        message: 'Album not found! Try again later',
      });

    if (!(await album.removeUser(user)))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Album successfully removed from your wishlist',
    });
  }

  async makePublic(req, res) {
    const public_wishlist = true;

    const user = await User.findByPk(req.userId);

    if (!(await user.update({ public_wishlist })))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Wishlist has been changed to public',
    });
  }

  async makePrivate(req, res) {
    const public_wishlist = false;

    const user = await User.findByPk(req.userId);

    if (!(await user.update({ public_wishlist })))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Wishlist has been changed to private',
    });
  }
}

export default new WishlistController();
