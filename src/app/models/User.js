import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    /**
     * Calling 'init' method of Model class
     */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        coordinator: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
