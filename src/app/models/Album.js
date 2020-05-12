import Sequelize, { Model } from 'sequelize';

class Album extends Model {
  static init(sequelize) {
    super.init(
      {
        spotify_id: Sequelize.STRING,
        album_name: Sequelize.STRING,
        album_artist: Sequelize.JSON,
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
    this.hasMany(models.Review, { foreignKey: 'album_id', as: 'album_review' });

    this.belongsToMany(models.List, {
      foreignKey: 'album_id',
      through: 'album_list',
      as: 'album_id___album_list',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'album_id',
      through: 'wishlists',
      as: 'album_id___wishlists',
    });
  }
}

export default Album;
