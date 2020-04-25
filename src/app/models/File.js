import Sequelize, { Model } from 'sequelize';
import 'dotenv/config';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return process.env.BASE_URL_FILE + this.path;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;