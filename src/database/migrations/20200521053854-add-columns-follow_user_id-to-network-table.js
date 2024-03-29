module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('network', 'follow_user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('network', 'follow_user_id');
  },
};
