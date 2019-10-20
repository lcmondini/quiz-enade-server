module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'quizenade',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
