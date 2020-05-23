import Sequelize from 'sequelize';
/*  import mongoose from 'mongoose'; */
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Tag from '../app/models/Tag';
import Review from '../app/models/Review';
import List from '../app/models/List';
import ListAlbum from '../app/models/ListAlbum';
import Album from '../app/models/Album';
import ReviewComment from '../app/models/ReviewComment';
import ListComment from '../app/models/ListComment';

import ReportUser from '../app/models/ReportUser';
import ReportAlbum from '../app/models/ReportAlbum';
import ReportList from '../app/models/ReportList';
import ReportReview from '../app/models/ReportReview';
import ReportCommentList from '../app/models/ReportCommentList';
import ReportCommentReview from '../app/models/ReportCommentReview';

const models = [
  User,
  File,
  Tag,
  Review,
  List,
  ListAlbum,
  Album,
  ReviewComment,
  ListComment,
  ReportUser,
  ReportAlbum,
  ReportList,
  ReportReview,
  ReportCommentList,
  ReportCommentReview,
];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    /*
     * To create a One-To-One relationship, the hasOne and belongsTo associations are used together; *
     * To create a One-To-Many relationship, the hasMany and belongsTo associations are used together; *
     * To create a Many-To-Many relationship, two belongsToMany calls are used together. *
     */
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  /* mongo() {
     this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/musicbox',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  } */
}

export default new Database();
