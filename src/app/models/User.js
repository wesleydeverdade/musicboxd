import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        location: Sequelize.STRING,
        website: Sequelize.STRING,
        bio: Sequelize.STRING,
        people_section: Sequelize.BOOLEAN,
        first_favorite_album: Sequelize.STRING,
        second_favorite_album: Sequelize.STRING,
        third_favorite_album: Sequelize.STRING,
        fourth_favorite_album: Sequelize.STRING,
        fifth_favorite_album: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasMany(models.Review, { foreignKey: 'user_id', as: 'reviews' });
    this.hasMany(models.List, { foreignKey: 'user_id', as: 'lists' });
    this.hasMany(models.Wishlist, { foreignKey: 'user_id', as: 'wishlists' });
    this.belongsToMany(models.List, {
      foreignKey: 'user_id',
      through: 'list_likes',
      as: 'user_id___list_likes',
    });
    this.belongsToMany(models.Review, {
      foreignKey: 'user_id',
      through: 'review_likes',
      as: 'user_id___review_likes',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
