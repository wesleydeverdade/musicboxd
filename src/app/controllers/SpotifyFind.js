import Spotify from '../services/Spotify';

class SpotifyFind {
  async search(req, res) {
    return res.json(await Spotify.search({ album: req.query.album }));
  }

  async album(req, res) {
    return res.json(await Spotify.album({ id: req.query.id }));
  }

  async artist(req, res) {
    return res.json(await Spotify.artist({ id: req.query.id }));
  }
}

export default new SpotifyFind();
