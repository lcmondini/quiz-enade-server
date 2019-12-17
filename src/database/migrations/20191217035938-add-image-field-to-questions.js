module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('questions', 'image_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('questions', 'image_id');
  },
};
