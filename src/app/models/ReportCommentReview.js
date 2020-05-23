import Sequelize, { Model } from 'sequelize';

class ReportCommentReview extends Model {
  static init(sequelize) {
    super.init(
      {
        reason: Sequelize.INTEGER,
        content: Sequelize.TEXT,
      },
      { sequelize, paranoid: true, deleted_at: 'destroyTime' }
    );
    return this;
  }
}

export default ReportCommentReview;
