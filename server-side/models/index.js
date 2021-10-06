const dbConfig = require('../config/database.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password,
    { host: dbConfig.host, dialect: dbConfig.dialect, operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.restaurants = require('./restaurantModel.js')(sequelize, Sequelize);

module.exports = db;