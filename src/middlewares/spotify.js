import axios from "axios";
import qs from "querystring";

const self = {
  auth: async function(){
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
      return ({ success: true,  message: response.data.access_token });
    } catch (error) {
      return ({ success: false, message: 'Falha ao autenticar-se' });
    }      
  },
  search: async function(req, res){

    if(!req.body.album){
      res.send({ success: false,  message: 'Parâmetro album não foi enviado' });
    }
    
    const auth = await self.auth();
    var key = "";

    if(!auth.success){
      res.send({ success: false,  message: 'Erro na autenticação' });
    }else{
      key = auth.message; 
    }
    
    const endpoint = "https://api.spotify.com/v1/search?";

    axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    };

    const data = {
      q: req.body.album,
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
      res.send({ success: true,  message: response.data });
    } catch (err) {
      res.send({ success: false,  message: 'Erro ao requisitar álbum' });
    }
  }
};

export default self;