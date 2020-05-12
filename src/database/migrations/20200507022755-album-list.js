module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('album_list', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
