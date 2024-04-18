const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'users',
    'root',
    'Root8184!',
    {
        host: '79.174.88.157',
        port: '15137',
        dialect: 'postgres',
    }
)
