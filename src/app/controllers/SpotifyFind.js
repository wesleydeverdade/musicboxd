import Spotify from '../services/Spotify';

class SpotifyFind {
  async search(req, res) {
    return res.json(await Spotify.search({ album: req.query.album }));
  }
}

export default new SpotifyFind();
