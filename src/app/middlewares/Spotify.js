import axios from 'axios';
import qs from 'querystring';

const self = {
  async auth() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const endpoint = 'https://accounts.spotify.com/api/token';

    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };

    const data = {
      grant_type: 'client_credentials',
    };

    try {
      const response = await axios.post(endpoint, qs.stringify(data), headers);
      return { success: true, message: response.data.access_token };
    } catch (error) {
      return { success: false, message: 'Falha ao autenticar-se' };
    }
  },
  async search(req, res) {
    if (!req.query.album) {
      res.json({ success: false, message: 'Parâmetro album não foi enviado' });
    }

    const auth = await self.auth();
    let key = '';

    if (!auth.success) {
      res.json({ success: false, message: 'Erro na autenticação' });
    } else {
      key = auth.message;
    }

    const endpoint = 'https://api.spotify.com/v1/search?';

    axios.defaults.headers.common.Authorization = `Bearer ${key}`;
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const data = {
      q: req.query.album,
      type: 'album',
    };

    try {
      const response = await axios.get(endpoint + qs.stringify(data), headers);
      res.json({ success: true, message: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Erro ao requisitar álbum' });
    }
  },
  async album(req, res) {
    if (!req.query.id) {
      res.json({
        success: false,
        message: 'Parâmetro id/album não foi enviado',
      });
    }

    const auth = await self.auth();
    let key = '';

    if (!auth.success) {
      res.json({ success: false, message: 'Erro na autenticação' });
    } else {
      key = auth.message;
    }

    const endpoint = `https://api.spotify.com/v1/albums/${req.query.id}`;

    axios.defaults.headers.common.Authorization = `Bearer ${key}`;
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await axios.get(endpoint, headers);
      res.json({ success: true, message: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Erro trazer informações do álbum' });
    }
  },
  async artist(req, res) {
    if (!req.query.id) {
      res.json({
        success: false,
        message: 'Parâmetro id/artista não foi enviado',
      });
    }

    const auth = await self.auth();
    let key = '';

    if (!auth.success) {
      res.json({ success: false, message: 'Erro na autenticação' });
    } else {
      key = auth.message;
    }

    const endpoint = `https://api.spotify.com/v1/artists/${req.query.id}`;

    axios.defaults.headers.common.Authorization = `Bearer ${key}`;
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await axios.get(endpoint, headers);
      res.json({ success: true, message: response.data });
    } catch (err) {
      res.json({
        success: false,
        message: 'Erro trazer informações do artista',
      });
    }
  },
};

export default self;
