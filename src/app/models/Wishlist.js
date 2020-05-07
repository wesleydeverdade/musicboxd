import Sequelize, { Model } from 'sequelize';

class Wishlist extends Model {
  static init(sequelize) {
    super.init(
      {
        album_id: Sequelize.STRING,
        album_name: Sequelize.STRING,
        album_artist: Sequelize.STRING,
        album_release_date: Sequelize.DATE,
        album_genres: Sequelize.JSON,
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

export default Wishlist;
