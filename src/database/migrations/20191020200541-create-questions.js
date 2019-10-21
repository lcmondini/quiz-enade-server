module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      course: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      correct_answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      option_a: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      option_b: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      option_c: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      option_d: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      option_e: {
        type: Sequelize.STRING,
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
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('questions');
  },
};
