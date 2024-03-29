import Sequelize, { Model } from 'sequelize';

class ListAlbum extends Model {
  static init(sequelize) {
    super.init(
      {
        album_order: Sequelize.INTEGER,
        note: Sequelize.TEXT,
      },
      { sequelize }
    );
    return this;
  }
}

export default ListAlbum;
