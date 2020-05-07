module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reviews', {
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
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      note: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      liked: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('reviews');
  },
};
