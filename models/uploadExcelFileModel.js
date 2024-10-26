const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
    const excelfile = sequelize.define('excelfile', {
        excelfileID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        excelfile: {
            type: DataTypes.STRING,
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
        tableName: "excelfile",
    });
    return excelfile;
};   