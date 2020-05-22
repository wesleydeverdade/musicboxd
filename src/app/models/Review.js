import Sequelize, { Model } from 'sequelize';

class Review extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.TEXT,
        note: Sequelize.DECIMAL(10, 2),
        liked: Sequelize.BOOLEAN,
        mute_comments_notification: Sequelize.BOOLEAN,
        allowed_replies: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'review_user' });
    this.belongsTo(models.Album, {
      foreignKey: 'album_id',
      as: 'review_album',
    });

    this.belongsToMany(models.Tag, {
      foreignKey: 'review_id',
      through: 'review_tags',
      as: 'tags',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'review_id',
      through: 'review_likes',
      as: 'users',
    });
  }
}

export default Review;
