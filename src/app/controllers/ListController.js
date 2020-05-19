// import { Op } from 'sequelize';
// import List from '../models/List';
// import Album from '../models/Album';
// import Tag from '../models/Tag';
// import Spotify from '../services/Spotify';

class ListController {
  async index(req, res) {
    return res.json(req.body);
  }

  async store(req, res) {
    return res.json(req.body);
  }

  async update(req, res) {
    return res.json(req.body);
  }

  async delete(req, res) {
    return res.json(req.body);
  }
}

export default new ListController();
