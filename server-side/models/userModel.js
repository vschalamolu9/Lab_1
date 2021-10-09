const {Sequelize} = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email_id: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        city:{
            type: Sequelize.STRING,
            allowNull: false
        },
        province:{
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return User;
}

