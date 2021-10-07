const {Sequelize} = require("sequelize");
const Item = require('./itemModel.js');
module.exports = (sequelize, Sequelize) => {

    const Restaurant = sequelize.define("restaurant", {
        restaurant_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        restaurant_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        restaurant_street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        restaurant_city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        restaurant_state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        restaurant_zip_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        delivery_fee:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        min_delivery_time:{
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 40
        },
        max_delivery_time:{
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 60
        },
        rating:{
            type: Sequelize.DECIMAL,
            allowNull: false,
            default: 0
        },
        num_reviews:{
            type: Sequelize.INTEGER,
            required: true,
            default: 0
        }
    })

    return Restaurant;
}