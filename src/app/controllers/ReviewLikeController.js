import { Op } from 'sequelize';
import Review from '../models/Review';
import User from '../models/User';

class ReviewLikeController {
  async store(req, res) {
    const { review_id } = req.params;

    const validReview = await Review.findOne({
      where: {
        user_id: { [Op.ne]: req.userId },
        id: { [Op.eq]: review_id },
      },
    });

    if (!validReview) {
      return res.status(400).json({
        success: false,
        message: "You can't like this review",
      });
    }

    const review = await Review.findByPk(review_id);
    const user = await User.findByPk(req.userId);

    if (!(await review.addUser(user)))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Review received its Like successfully',
    });
  }

  async destroy(req, res) {
    const { review_id } = req.params;

    const validReview = await Review.findOne({
      where: {
        user_id: { [Op.ne]: req.userId },
        id: { [Op.eq]: review_id },
      },
    });

    if (!validReview) {
      return res.status(400).json({
        success: false,
        message: "You can't like this review",
      });
    }

    const review = await Review.findByPk(review_id);
    const user = await User.findByPk(req.userId);

    if (!(await review.removeUser(user)))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'Review had its Like removed successfully',
    });
  }
}

export default new ReviewLikeController();
