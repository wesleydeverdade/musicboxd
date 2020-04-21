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
