module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('report_albums', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // [(0) Duplicate Entry, (1) Not an valid album, (2) Other Reason]
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
      report_album_id: {
        type: Sequelize.INTEGER,
        references: { model: 'albums', key: 'id' },
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
    return queryInterface.dropTable('report_albums');
  },
};
