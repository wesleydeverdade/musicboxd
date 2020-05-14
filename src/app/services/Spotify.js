import axios from 'axios';
import qs from 'querystring';

class Spotify {
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
  }

  async search({ album }) {
    if (!album) {
      throw new Error('Parâmetro album não foi enviado');
    }

    const auth = await this.auth();
    let key = '';

    if (!auth.success) {
      throw new Error('Erro na autenticação');
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
      q: album,
      type: 'album',
    };

    try {
      const response = await axios.get(endpoint + qs.stringify(data), headers);
      return response.data;
    } catch (err) {
      throw new Error('Erro ao requisitar álbum');
    }
  }

  async album({ id }) {
    if (!id) {
      throw new Error('Parâmetro id/album não foi enviado');
    }

    const auth = await this.auth();
    let key = '';

    if (!auth.success) {
      throw new Error('Erro na autenticação');
    } else {
      key = auth.message;
    }

    const endpoint = `https://api.spotify.com/v1/albums/${id}`;

    axios.defaults.headers.common.Authorization = `Bearer ${key}`;
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await axios.get(endpoint, headers);
      return response.data;
    } catch (err) {
      throw new Error('Erro trazer informações do álbum');
    }
  }

  async artist({ id }) {
    if (!id) {
      throw new Error('Parâmetro id/artista não foi enviado');
    }

    const auth = await this.auth();
    let key = '';

    if (!auth.success) {
      throw new Error('Erro na autenticação');
    } else {
      key = auth.message;
    }

    const endpoint = `https://api.spotify.com/v1/artists/${id}`;

    axios.defaults.headers.common.Authorization = `Bearer ${key}`;
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await axios.get(endpoint, headers);
      return response.data;
    } catch (err) {
      throw new Error('Erro trazer informações do artista');
    }
  }
}

export default new Spotify();
