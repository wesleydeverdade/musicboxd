module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('list_albums', 'list_id', {
      type: Sequelize.INTEGER,
      references: { model: 'lists', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('list_albums', 'list_id');
  },
};
