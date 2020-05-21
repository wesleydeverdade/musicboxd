import { Op } from 'sequelize';
import List from '../models/List';
import Review from '../models/Review';
import ReviewComment from '../models/ReviewComment';

class CommentReviewController {
  async index(req, res) {
    return res.json(req.body);
  }

  async show(req, res) {
    return res.json(req.body);
  }

  async store(req, res) {
    return res.json(req.body);
  }

  async update(req, res) {
    return res.json(req.body);
  }

  async destroy(req, res) {
    return res.json(req.body);
  }
}

export default new CommentReviewController();
