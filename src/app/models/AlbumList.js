import Sequelize, { Model } from 'sequelize';

class AlbumList extends Model {
  static init(sequelize) {
    super.init(
      {
        album_id: Sequelize.STRING,
        album_name: Sequelize.STRING,
        album_artist: Sequelize.STRING,
        album_release_date: Sequelize.DATE,
        album_genres: Sequelize.JSON,
        order: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.List, { foreignKey: 'list_id', as: 'list' });
  }
}

export default AlbumList;
