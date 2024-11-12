// // yourDataModel.js
// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//     const YourModel = sequelize.define("YourModel", {
//         // Define your fields
//         field1: {
//             type: DataTypes.STRING, // Adjust type as needed
//             allowNull: false // Adjust based on your requirements
//         },
//         field2: {
//             type: DataTypes.STRING, 
//             allowNull: false 
//         },
//         excelfileId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//     }, {
//         tableName: 'your_model_table_name', // Change this to your desired table name
//         timestamps: true, // Enable createdAt and updatedAt fields if needed
//     });

//     return YourModel;
// };





// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//     const Admin = sequelize.define('admin', {
//         adminID: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING,    
//             allowNull: false,
//         },
//         role: {
//             type: DataTypes.INTEGER,
//             defaultValue: 1
//         },
//         createdBy: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         createdOn: {
//             type: DataTypes.DATE,
//             defaultValue: DataTypes.NOW
//         },
//     }, {
//         timestamps: false,
//         tableName: "admin",
//     });

//     // Add hook to insert static data after table creation
//     Admin.afterSync(async () => {
//         const count = await Admin.count();
//         if (count === 0) {
//             await Admin.create({
//                 email: 'compnay@example.com',
//                 username: 'company123',
//                 password: 'company123',
//                 createdBy: 'superadmin'
//             });
//         }
//     });

//     return Admin;
// };



const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const your = sequelize.define('your', {
        youid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING, // Adjust type as needed
            allowNull: true // Adjust based on your requirements
        },
        contactnumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bussinesstype: {
            type: DataTypes.STRING,
            allowNull: true
        },
        excelfileID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: "your",
    });

    return your;
};


