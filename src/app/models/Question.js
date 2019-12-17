import Sequelize, { Model } from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        course: Sequelize.STRING,
        keyword: Sequelize.STRING,
        description: Sequelize.STRING,
        correct_answer: Sequelize.STRING,
        option_a: Sequelize.STRING,
        option_b: Sequelize.STRING,
        option_c: Sequelize.STRING,
        option_d: Sequelize.STRING,
        option_e: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
  }
}

export default Question;
