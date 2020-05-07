module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('album_list', {
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
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('album_list');
  },
};
