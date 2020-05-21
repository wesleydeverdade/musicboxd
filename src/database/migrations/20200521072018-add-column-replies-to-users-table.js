module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'replies', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false, // 0 (anyone can reply), 1 (friends [people YOU follow]), 2 (Only You)
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'replies');
  },
};
