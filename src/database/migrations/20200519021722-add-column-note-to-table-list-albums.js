module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('list_albums', 'note', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('list_albums', 'note');
  },
};
