import Sequelize, { Model } from 'sequelize';

class ReportReview extends Model {
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

export default ReportReview;
