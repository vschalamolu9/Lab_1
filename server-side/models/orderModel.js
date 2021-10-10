const {Sequelize} = require('sequelize');
module.exports = (sequelize, Sequelize) => {

    const Order = sequelize.define("order",{

        order_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        items_price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        tax_price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        delivery_fee:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        total_price: {
            type:Sequelize.DECIMAL,
            allowNull: false
        },
        payment_method:{
            type: Sequelize.STRING,
            allowNull: false
        },
        order_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        delivery_address: {
            type: Sequelize.STRING,
            allowNull: true
        },
    })

    return Order;
}