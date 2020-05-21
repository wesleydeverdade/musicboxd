module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('lists', 'mute_comments_notification', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('lists', 'mute_comments_notification');
  },
};
