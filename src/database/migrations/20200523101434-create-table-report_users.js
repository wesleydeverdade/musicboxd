module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('report_users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // [(0) Account exhibits a pattern of posting unwelcome, aggressive or abusive remarks directed at another member, (1) Account exhibits a pattern of posting racist, sexist, homophobic or other discriminatory views (including white nationalist ideologies), (2) Account exhibits a pattern of plagiarism (please include link/s to original content), (3) Account promotes piracy or other illegal activity, (4) Account is attempting to manipulate film ratings or popularity (by following an excessive number of accounts), (5) Account is posting unsolicited links to content, products or services, including for self-promotion, (6) Account is an impersonation, satire or parody, (7) Account has attempted to solicit personal information from a member (please include a relevant link), (8) Account has an offensive username, avatar or bio, (9) Other Reason ]
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
      reported_user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
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
    return queryInterface.dropTable('report_users');
  },
};
