import User from '../models/User';

class UserBlockController {
  async store(req, res) {
    const block_user_id = parseInt(req.params.block_user_id, 10);

    if (block_user_id === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot block yourself',
      });
    }

    const validUser = await User.findByPk(block_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'You cannot block this user',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.addBlock(validUser)))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'User successfully blocked',
    });
  }

  async destroy(req, res) {
    const block_user_id = parseInt(req.params.block_user_id, 10);

    if (block_user_id === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot unlock yourself',
      });
    }

    const validUser = await User.findByPk(block_user_id);

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'You cannot unlock this user',
      });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.removeBlock(validUser)))
      return res.json({
        success: false,
        message:
          'An error occurred while performing the operation, please try again later',
      });

    return res.json({
      success: true,
      message: 'User successfully unlocked',
    });
  }
}

export default new UserBlockController();
