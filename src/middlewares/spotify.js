import axios from "axios";
import qs from "querystring";

class Spotify {
  
  async auth(){
    const clientId =  "5e3a5116a53f4354aa4dd0feda2225dd";
    const clientSecret = "c7be98e714264cad93287bc43bfe8f9d";      

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
      const response = await axios.post(
        endpoint,
        qs.stringify(data),
        headers
      );
      return response.data.access_token;
    } catch (error) {
      return false;
    }
  };

  async search(album) {

    if(!album){
      return false;
    }

    const key = await this.auth();
    
    const endpoint = "https://api.spotify.com/v1/search?";

    axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    };

    const data = {
      q: album,
      type: "album",
      market: 'us',
      limit: 10,
      offset: 5
    }

    try {
      const response = await axios.get(
        endpoint+qs.stringify(data),
        headers
      );
      //console.log(response.data);
      return response.data;      
    } catch (err) {
      //console.log(err.response);
      return false;
    }

  }
}
 
export default new Spotify().search("Nevermind");