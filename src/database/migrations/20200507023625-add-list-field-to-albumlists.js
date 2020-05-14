module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('album_lists', 'list_id', {
      type: Sequelize.INTEGER,
      references: { model: 'lists', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('album_lists', 'list_id');
  },
};
