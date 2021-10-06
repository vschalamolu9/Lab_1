
module.exports = {
    host: 'uber-eats-db.crvp7nidfeos.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'UberEatsDB',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};


