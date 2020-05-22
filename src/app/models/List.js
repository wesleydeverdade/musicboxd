import Sequelize, { Model } from 'sequelize';

class List extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        public: Sequelize.BOOLEAN,
        ranked_list: Sequelize.BOOLEAN,
        mute_comments_notification: Sequelize.BOOLEAN,
        allowed_replies: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'list_user' });

    this.belongsToMany(models.Tag, {
      foreignKey: 'list_id',
      through: 'list_tags',
      as: 'tags',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'list_id',
      through: 'list_likes',
      as: 'users',
    });
    this.belongsToMany(models.Album, {
      foreignKey: 'list_id',
      through: 'list_albums',
      as: 'albums',
    });
    this.hasMany(models.ListComment, {
      foreignKey: 'list_id',
      as: 'list_comment',
    });
  }
}

export default List;
