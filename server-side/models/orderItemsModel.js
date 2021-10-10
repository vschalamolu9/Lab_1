const {Sequelize} = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    const OrderItems = sequelize.define("orderItem", {
        order_items_id :{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return OrderItems;
}