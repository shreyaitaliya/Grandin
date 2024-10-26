const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const adminModel = require("../models/adminModel")(sequelize, DataTypes);
const jwt = require('jsonwebtoken');

//Add Admin
const AdminAdd = async (req, res) => {
    try {
        const { name, email, username, password, role } = req.body
        const createdBy = req.user.username

        const AddData = await adminModel.create({ name, email, username, password, role, createdBy })

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

const AdminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // If not found in userModel, check in adminModel
        const admin = await adminModel.findOne({ where: { username: username } });

        if (!admin) {
            return res.status(400).send({
                success: false,
                message: 'Admin Not Found..',
            });
        }

        // Check if the password matches
        if (!admin || admin.password !== password) {
            return res.status(400).send({
                success: false,
                message: 'Passwords Do Not Match. Please Provide a Valid Password..',
            });
        }

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiVXNlciI6eyJhZG1pbklEIjoxLCJuYW1lIjoiYSIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImEiLCJwYXNzd29yZCI6ImEiLCJyb2xlIjoxLCJjcmVhdGVkQnkiOiJzaHJleWExMjMiLCJjcmVhdGVkT24iOiIyMDI0LTEwLTI2VDEwOjI5OjM3LjAwMFoifSwiaWF0IjoxNzI5OTM5OTQ4LCJleHAiOjEyMzY3MjA4ODM5OTQ4fQ.NW2TxZyT-1CI4orkLqKTXwH5jLXujmvP8lK12GwaTCA'

        return res.status(200).send({
            success: true,
            message: 'Login Successfully..',
            Token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = ({ AdminAdd, AdminLogin })