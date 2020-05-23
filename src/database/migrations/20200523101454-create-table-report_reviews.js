module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('report_reviews', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // [(0) Contains Abuse, (1) Contains Plagiarism, (2) Contains Spam, (3) Other Reason]
      reason: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      report_review_id: {
        type: Sequelize.INTEGER,
        references: { model: 'reviews', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('report_reviews');
  },
};
