module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('album_list', 'list_id', {
      type: Sequelize.INTEGER,
      references: { model: 'lists', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('album_list', 'list_id');
  },
};
