


const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Admin = sequelize.define('admin', {
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
            defaultValue: 1 // Default is admin
        },
    }, {
        timestamps: false,
        tableName: "admin",
    });

    // Add hook to insert static data after table creation
    Admin.afterSync(async () => {
        const count = await Admin.count();
        if (count === 0) {
            await Admin.create({
                username: 'company123',
                password: 'company123',
                role: 1
            });
            await Admin.create({
                username: 'superadmin123',
                password: 'superadmin123',
                role: 0
            });
        }
    });

    return Admin;
};

