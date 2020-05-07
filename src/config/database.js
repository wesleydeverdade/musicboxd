module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'musicbox',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// module.exports = {
//   dialect: 'mysql',
//   host: '127.0.0.1',
//   username: 'root',
//   password: 'docker',
//   database: 'musicbox',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };
