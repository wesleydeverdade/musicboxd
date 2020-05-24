import { Op } from 'sequelize';
import Review from '../models/Review';

class CommentPolicyReview {
  async store(req, res) {
    const { review_id, allowed_replies } = req.body;

    const review = await Review.findOne({
      where: {
        [Op.and]: [{ user_id: req.userId }, { id: review_id }],
      },
    });

    if (!review) {
      return res.status(400).json({
        success: false,
        message: 'Review does not belong to the user',
      });
    }

    await review.update({ allowed_replies });
    return res.json({ review });
  }
}

export default new CommentPolicyReview();
