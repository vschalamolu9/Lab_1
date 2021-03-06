const {Sequelize} = require('sequelize');
module.exports = (sequelize, Sequelize) => {

    const Item = sequelize.define("item", {
        item_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        item_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        item_price: {
            type: Sequelize.DECIMAL(5,2),
            allowNull: false
        },
        min_cal:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        max_cal: {
            type: Sequelize.INTEGER,
            allowNull: false
        }

    })

    return Item;
}