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

  static associate(models) {
    this.belongsTo(models.List, {
      foreignKey: 'list_id',
      as: 'list_comment',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'list_comment_id',
      through: 'user_list_comments',
      as: 'comments',
    });
  }
}

export default ListComment;
