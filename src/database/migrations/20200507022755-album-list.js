module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('list_albums', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      album_order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('list_albums');
  },
};
