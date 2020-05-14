module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('album_lists', 'album_id', {
      type: Sequelize.INTEGER,
      references: { model: 'albums', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('album_lists', 'album_id');
  },
};
