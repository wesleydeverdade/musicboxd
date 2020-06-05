import User from '../models/User';

class NetworkController {
  async store(req, res) {
    const follow_user_id = parseInt(req.params.follow_user_id, 10);

    if (follow_user_id === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself',
      });
    }

    const validUser = await User.findByPk(follow_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow this user',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.addFollower(validUser)))
      return res.status(503).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'User followed successfully',
    });
  }

  async destroy(req, res) {
    const follow_user_id = parseInt(req.params.follow_user_id, 10);

    if (follow_user_id === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot unfollow yourself',
      });
    }

    const validUser = await User.findByPk(follow_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow this user',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.removeFollower(validUser)))
      return res.status(503).json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'User successfully unfollowed',
    });
  }
}

export default new NetworkController();
