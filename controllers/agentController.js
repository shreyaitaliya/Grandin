const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const agentModel = require("../models/agentModel")(sequelize, DataTypes);
const jwt = require('jsonwebtoken');

//Add Admin
const AgentAdd = async (req, res) => {
    try {
        const { name, email, username, password, role } = req.body
        const createdBy = req.admin.username

        const AddData = await agentModel.create({ name, email, username, password, role, createdBy })

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

const AgentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // If not found in userModel, check in adminModel
        const admin = await agentModel.findOne({ where: { username: username } });

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

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnsiYWdlbnRJRCI6MSwibmFtZSI6ImFnZW50IiwiZW1haWwiOiJhZ2VudEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFnZW50IiwicGFzc3dvcmQiOiJhZ2VudCIsInJvbGUiOjMsImNyZWF0ZWRCeSI6ImEiLCJjcmVhdGVkT24iOiIyMDI0LTEwLTI2VDEzOjAyOjQ2LjAwMFoifSwiaWF0IjoxNzI5OTQ4MjU5LCJleHAiOjEyMzY3MjA4ODQ4MjU5fQ.tV2Wutrp9imnuuzHYe53wc0uqqiLX0FvLZbCdCOwMPM';
        
        return res.status(200).send({
            success: true,
            message: 'Login Successfully..',
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = ({ AgentAdd, AgentLogin })