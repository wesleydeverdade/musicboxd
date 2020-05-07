import Sequelize, { Model } from 'sequelize';
import 'dotenv/config';

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Tag;
