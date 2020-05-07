import Sequelize, { Model } from 'sequelize';

class Review extends Model {
  static init(sequelize) {
    super.init(
      {
        album_id: Sequelize.STRING,
        album_name: Sequelize.STRING,
        album_artist: Sequelize.STRING,
        album_release_date: Sequelize.DATE,
        album_genres: Sequelize.JSON,
        content: Sequelize.TEXT,
        note: Sequelize.DECIMAL(10, 2),
        liked: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Tag, {
      foreignKey: 'review_id',
      through: 'review_tags',
      as: 'review_id___review_tags',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'review_id',
      through: 'review_likes',
      as: 'review_id___review_likes',
    });
  }
}

export default Review;
