import Sequelize, { Model } from 'sequelize';

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Review, {
      foreignKey: 'tag_id',
      through: 'review_tags',
      as: 'tag_id___review_tags',
    });
    this.belongsToMany(models.List, {
      foreignKey: 'tag_id',
      through: 'list_tags',
      as: 'tag_id___list_tags',
    });
  }
}

export default Tag;
