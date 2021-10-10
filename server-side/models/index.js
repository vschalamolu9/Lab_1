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
db.items = require('./itemModel.js')(sequelize, Sequelize);
db.users = require('./userModel.js')(sequelize, Sequelize),
db.orders = require('./orderModel.js')(sequelize, Sequelize);
db.orderItems = require('./orderItemsModel.js')(sequelize, Sequelize);


//Associations
db.restaurants.hasMany(db.items)
db.items.belongsTo(db.restaurants)
db.users.hasMany(db.orders)
db.orders.belongsTo(db.users)
db.restaurants.hasMany(db.orders)
db.orders.belongsTo(db.restaurants)
db.orderItems.belongsTo(db.items)
db.items.hasMany(db.orderItems)
db.orderItems.belongsTo(db.orders)
db.orders.hasMany(db.orderItems)

module.exports = db;