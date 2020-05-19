module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('list_albums', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('list_albums', 'created_at');
  },
};
