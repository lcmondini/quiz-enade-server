import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    /**
     * Calling 'init' method of Model class
     */
    super.init(
      {
        /**
         * Field the user can send, does not reflect the field on the database
         * 'Sequelize.VIRTUAL' is a field that does not exists on the database
         */
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        coordinator: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /**
     * Before the user is saved, whether is created or modified, this hook is executed
     */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
