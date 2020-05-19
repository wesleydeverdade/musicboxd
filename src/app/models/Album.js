import Sequelize, { Model } from 'sequelize';

class Album extends Model {
  static init(sequelize) {
    super.init(
      {
        spotify_id: Sequelize.STRING,
        album_name: Sequelize.STRING,
        album_artists: Sequelize.JSON,
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
      through: 'list_albums',
      as: 'album_id___album_lists',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'album_id',
      through: 'wishlists',
      as: 'users',
    });
  }
}

export default Album;
