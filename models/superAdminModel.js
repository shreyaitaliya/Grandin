const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
    const superAdmin = sequelize.define('superAdmin', {
        adminID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {   
            type: DataTypes.INTEGER,
            default: false
        }  
    }, {
        timestamps: false,
        tableName: "superAdmin",
    });
    return superAdmin;
};   