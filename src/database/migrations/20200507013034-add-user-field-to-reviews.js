module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('reviews', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('reviews', 'user_id');
  },
};
