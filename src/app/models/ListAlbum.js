import Sequelize, { Model } from 'sequelize';

class ListAlbum extends Model {
  static init(sequelize) {
    super.init({ order: Sequelize.INTEGER }, { sequelize });
    return this;
  }
}

export default ListAlbum;
