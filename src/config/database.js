module.exports = {
    dialect: 'mysql',
    host: 'mysql',
    username: 'root',
    password: 'docker',
    database: 'plathanus',
    connectionLimit: '10',
    port: '3306',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
