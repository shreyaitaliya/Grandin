const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const superadminModel = require("../models/superAdminModel")(sequelize, DataTypes);
const jwt = require('jsonwebtoken');


async function createAdmin() {
    const adminExists = await superadminModel.findOne();
    if (!adminExists) {
        await superadminModel.create({
            username: "superadmin",
            password: "superadmin",
            role: 0,
        });
        console.log("Admin created successfully");
    } else {
        console.log("Admin already exists");
    }
}

createAdmin();

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // If not found in userModel, check in adminModel
        const admin = await superadminModel.findOne({ where: { username: username } });

        if (!admin) {
            return res.status(400).send({
                success: false,
                message: 'Admin Not Found..',
            });
        }

        // Check if the password matches
        if (admin.password !== password) {
            return res.status(400).send({
                success: false,
                message: 'Passwords Do Not Match. Please Provide a Valid Password..',
            });
        }

        // Use a static token
        const staticToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImFkbWluSUQiOjEsInVzZXJuYW1lIjoic3VwZXJhZG1pbiIsInBhc3N3b3JkIjoic3VwZXJhZG1pbiIsInJvbGUiOjB9LCJpYXQiOjE3Mjk5NDMyNjEsImV4cCI6MTIzNjcyMDg4NDMyNjF9.MeHQPhpd7j_JlDgSDEuTKPci82JHgmIdwnaz6z2LU3M';

        return res.status(200).send({
            success: true,
            message: 'Login Successfully..',
            Token: staticToken
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


module.exports = ({ login })