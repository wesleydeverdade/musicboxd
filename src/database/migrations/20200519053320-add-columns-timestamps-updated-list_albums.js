module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('list_albums', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('list_albums', 'updated_at');
  },
};
