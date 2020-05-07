import Sequelize, { Model } from 'sequelize';

class List extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        public: Sequelize.BOOLEAN,
        ranked_list: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.AlbumList, { foreignKey: 'list_id', as: 'lists' });
    this.belongsToMany(models.User, {
      foreignKey: 'list_id',
      through: 'list_likes',
      as: 'list_id___list_likes',
    });
    this.belongsToMany(models.Tag, {
      foreignKey: 'list_id',
      through: 'list_tags',
      as: 'list_id___list_tags',
    });
  }
}

export default List;
