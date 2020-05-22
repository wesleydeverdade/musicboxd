import Sequelize, { Model } from 'sequelize';

class ReviewComment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.TEXT,
      },
      {
        sequelize,
        paranoid: true,
        // If you want to give a custom name to the deletedAt column
        deleted_at: 'destroyTime',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Review, {
      foreignKey: 'review_id',
      as: 'review_comment',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'review_comment_id',
      through: 'user_review_comments',
      as: 'comments',
    });
  }
}

export default ReviewComment;