module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('reviews', 'allowed_replies', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('reviews', 'allowed_replies');
  },
};
