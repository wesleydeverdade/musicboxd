import Sequelize, { Model } from 'sequelize';

class AlbumList extends Model {
  static init(sequelize) {
    super.init({ order: Sequelize.INTEGER }, { sequelize });
    return this;
  }
}

export default AlbumList;
