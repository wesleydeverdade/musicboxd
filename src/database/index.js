import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {}

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/musicbox',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
