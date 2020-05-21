module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      people_section: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      first_favorite_album: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      second_favorite_album: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      third_favorite_album: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fourth_favorite_album: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fifth_favorite_album: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      public_wishlist: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
