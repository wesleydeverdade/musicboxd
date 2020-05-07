import Sequelize, { Model } from 'sequelize';
import 'dotenv/config';

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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Review;
