module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('lists', 'allowed_replies', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('lists', 'allowed_replies');
  },
};
