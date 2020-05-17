module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('list_albums', 'album_id', {
      type: Sequelize.INTEGER,
      references: { model: 'albums', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('list_albums', 'album_id');
  },
};
