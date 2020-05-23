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
        public_wishlist: Sequelize.BOOLEAN,
        replies: Sequelize.INTEGER, // 0 (anyone can reply), 1 (friends [people YOU follow]), 2 (Only You)
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
    this.hasMany(models.Review, { foreignKey: 'user_id', as: 'user_review' });
    this.hasMany(models.List, { foreignKey: 'user_id', as: 'user_list' });
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsToMany(models.List, {
      foreignKey: 'user_id',
      through: 'list_likes',
      as: 'lists',
    });
    this.belongsToMany(models.Review, {
      foreignKey: 'user_id',
      through: 'review_likes',
      as: 'reviews',
    });
    this.belongsToMany(models.Album, {
      foreignKey: 'user_id',
      through: 'wishlists',
      as: 'albums',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'user_id',
      through: 'network',
      as: 'followers',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'follow_user_id',
      through: 'network',
      as: 'users',
    });

    this.belongsToMany(models.ReviewComment, {
      foreignKey: 'user_id',
      through: 'user_review_comments',
      as: 'review_user_comments',
    });
    this.belongsToMany(models.ListComment, {
      foreignKey: 'user_id',
      through: 'user_list_comments',
      as: 'list_user_comments',
    });
    this.belongsToMany(models.ReviewComment, {
      foreignKey: 'user_id',
      through: 'review_comment_likes',
      as: 'user_review_comment_likes',
    });
    this.belongsToMany(models.ListComment, {
      foreignKey: 'user_id',
      through: 'list_comment_likes',
      as: 'user_list_comment_likes',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'user_id',
      through: 'user_blocks',
      as: 'blocks',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'blocked_user_id',
      through: 'user_blocks',
      as: 'users_blockeds',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'user_id',
      through: 'report_users',
      as: 'reports',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'reported_user_id',
      through: 'report_users',
      as: 'user_report_users',
    });
    this.belongsToMany(models.Album, {
      foreignKey: 'user_id',
      through: 'report_albums',
      as: 'user_report_realbums',
    });
    this.belongsToMany(models.Review, {
      foreignKey: 'user_id',
      through: 'report_reviews',
      as: 'user_report_reviews',
    });
    this.belongsToMany(models.List, {
      foreignKey: 'user_id',
      through: 'report_lists',
      as: 'user_report_lists',
    });
    this.belongsToMany(models.ReviewComment, {
      foreignKey: 'user_id',
      through: 'report_comment_reviews',
      as: 'user_report_comment_reviews',
    });
    this.belongsToMany(models.ListComment, {
      foreignKey: 'user_id',
      through: 'report_comment_lists',
      as: 'user_report_comment_lists',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
