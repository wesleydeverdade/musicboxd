module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('network', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('network', 'user_id');
  },
};
