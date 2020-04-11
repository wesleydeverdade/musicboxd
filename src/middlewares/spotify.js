import axios from "axios";
import qs from "querystring";

class Spotify {
  constructor() {

    this.clientId =  "5e3a51 16a53f4354aa4dd0feda2225dd";
    this.clientSecret = "c7be98e714264cad93287bc43bfe8f9d";  

    this.key = this.auth();
    this.album = "OK Computer";
    this.search(this.album);
  }

  auth = async () => {
    const endpoint = 'https://accounts.spotify.com/api/token';
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: this.clientId,
        password: this.clientSecret,
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
      return "";
    }
  };

  search(album) {
    
    const data = {
        q:album,
        type:"album",
        market:'us',
        limit:10,
        offset:5
    }

    const endpoint = "https://api.spotify.com/v1/search";

    console.log(data)

  }
}

export default new Spotify();
 