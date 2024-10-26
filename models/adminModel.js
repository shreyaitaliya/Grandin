const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define('admin', {
        adminID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
            defaultValue: 1
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {
        timestamps: false,
        tableName: "admin",
    });
    return admin;
};   