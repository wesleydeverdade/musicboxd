module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wishlists', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      album_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      album_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      album_artist: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      album_release_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      album_genres: {
        type: Sequelize.JSON,
        allowNull: false,
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
    return queryInterface.dropTable('wishlists');
  },
};
