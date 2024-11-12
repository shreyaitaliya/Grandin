// uploadExcelFileModel.js

module.exports = (sequelize, DataTypes) => {
    const Excelfile = sequelize.define("Excelfile", {
        excelfileID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        excelfile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    return Excelfile;
};
