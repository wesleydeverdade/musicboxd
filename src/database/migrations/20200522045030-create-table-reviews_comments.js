module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('review_comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deleted_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      review_id: {
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
    return queryInterface.dropTable('review_comments');
  },
};
