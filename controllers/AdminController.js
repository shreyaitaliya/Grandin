// // const { DataTypes, where } = require("sequelize");
// // const db = require('../config/db');
// // const sequelize = db.sequelize;
// // const adminModel = require("../models/adminModel")(sequelize, DataTypes);
// // const jwt = require('jsonwebtoken');

// // const AdminLogin = async (req, res) => {
// //     try {
// //         const { username, password } = req.body;

// //         // If not found in userModel, check in adminModel
// //         const admin = await adminModel.findOne({ where: { username: username } });

// //         if (!admin) {
// //             return res.status(400).send({
// //                 success: false,
// //                 message: 'Admin Not Found..',
// //             });
// //         }

// //         // Check if the password matches
// //         if (!admin || admin.password !== password) {
// //             return res.status(400).send({
// //                 success: false,
// //                 message: 'Passwords Do Not Match. Please Provide a Valid Password..',
// //             });
// //         }

// //         return res.status(200).send({
// //             success: true,
// //             message: 'Login Successfully..',
// //             Token: token
// //         });

// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).send({
// //             success: false,
// //             message: error.message
// //         });
// //     }
// // };

// // module.exports = ({ AdminLogin })


// const { DataTypes } = require("sequelize");
// const db = require('../config/db');
// const sequelize = db.sequelize;
// const adminModel = require("../models/adminModel")(sequelize, DataTypes);

// const AdminLogin = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Find admin by username
//         const admin = await adminModel.findOne({ where: { username: username } });

//         if (!admin) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'Admin Not Found.',
//             });
//         }

//         // Check if the password matches
//         if (admin.password !== password) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'Passwords Do Not Match. Please Provide a Valid Password.',
//             });
//         }

//         // Check the role and respond accordingly
//         if (admin.role === 0) {
//             return res.status(200).send({
//                 success: true,
//                 message: 'Superadmin Login Successfully.',
//             });
//         } else if (admin.role === 1) {
//             return res.status(200).send({
//                 success: true,
//                 message: 'Admin Login Successfully.',
//             });
//         } else {
//             return res.status(403).send({
//                 success: false,
//                 message: 'Unauthorized access.',
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({
//             success: false,
//             message: error.message
//         });
//     }
// };

// module.exports = { AdminLogin };

const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const adminModel = require("../models/adminModel")(sequelize, DataTypes);

const AdminLogin = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Find admin by username
        const admin = await adminModel.findOne({ where: { username: username } });

        if (!admin) {
            return res.status(400).send({
                success: false,
                message: 'Admin Not Found.',
            });
        }

        // Check if the password matches
        if (admin.password !== password) {
            return res.status(400).send({
                success: false,
                message: 'Passwords Do Not Match. Please Provide a Valid Password.',
            });
        }

        if (admin.role !== 0 && admin.role !== 1) {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized access. Only superadmin and admin can log in.',
            });
        }


        // If role is 1, login is successful
        return res.status(200).send({
            success: true,
            message: 'Admin Login Successfully.',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


const CompanyAdd = async (req, res) => {
    try {
        const { username, password } = req.body

        const AddData = await adminModel.create({ username, password })

        return res.status(200).send({
            success: true,
            message: 'Admin Added Successfully..',
            Data: AddData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

const getdata = async (req, res) => {
    try {

        const finddata = await adminModel.findAll({ where: { role: 1 } })

        return res.status(200).send({
            success: true,
            message: 'Admin find Successfully..',
            Data: finddata
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = { AdminLogin, CompanyAdd, getdata };

