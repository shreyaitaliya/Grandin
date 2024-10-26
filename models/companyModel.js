const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('company', {
        CompanyID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        companyname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobilenumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        tableName: "company",
    });
    return company;
};   