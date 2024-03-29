import Sequelize, { Model } from 'sequelize';

class ListComment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.TEXT,
        // 0: comment author, 1: review author
        deleted_by: Sequelize.INTEGER,
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
    this.belongsToMany(models.User, {
      foreignKey: 'list_comment_id',
      through: 'list_comment_likes',
      as: 'likes',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'report_list_comment_id',
      through: 'report_comment_lists',
      as: 'reports',
    });
  }
}

export default ListComment;
