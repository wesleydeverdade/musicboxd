import axios from 'axios';
import qs from 'querystring';
import 'dotenv/config';

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
    if (!req.body.album) {
      res.send({ success: false, message: 'Parâmetro album não foi enviado' });
    }

    const auth = await self.auth();
    let key = '';

    if (!auth.success) {
      res.send({ success: false, message: 'Erro na autenticação' });
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
      q: req.body.album,
      type: 'album',
    };

    try {
      const response = await axios.get(endpoint + qs.stringify(data), headers);
      res.send({ success: true, message: response.data });
    } catch (err) {
      res.send({ success: false, message: 'Erro ao requisitar álbum' });
    }
  },
};

export default self;
