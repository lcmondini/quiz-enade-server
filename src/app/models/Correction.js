import Sequelize, { Model } from 'sequelize';

class Correction extends Model {
  static init(sequelize) {
    super.init(
      {
        course: Sequelize.STRING,
        keyword: Sequelize.STRING,
        description: Sequelize.STRING,
        answer: Sequelize.STRING,
        user_name: Sequelize.STRING,
        corrected: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Correction;
