import Sequelize, { Model } from 'sequelize';

class ListComment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.TEXT,
      },
      {
        sequelize,
        paranoid: true,
        // If you want to give a custom name to the deletedAt column
        deleted_at: 'destroyTime',
      }
    );
    return this;
  }
}

export default ListComment;
