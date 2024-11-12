
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const apkresponddata = sequelize.define("apkresponddata", {
        apkresponddataID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateandtime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assigned: {
            type: DataTypes.STRING,
            allowNull: true
        },
        scheduled: {
            type: DataTypes.DATE,
            allowNull: true
        },
        intrested: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notintrested: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    return apkresponddata;
};
