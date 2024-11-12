const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const agentModel = require("../models/agentModel")
const jwt = require('jsonwebtoken');

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

        return res.status(200).send({
            success: true,
            message: 'Login Successfully..',
            Data: admin
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const AgentAdd = async (req, res) => {
    try {
        const { name, email, username, password, role, createdBy } = req.body

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

// GetallAgent 
const GetByData = async (req, res) => {
    try {
        const GetAlldata = await agentModel.findAll({});
        if (!GetAlldata) {
            return res.status(400).send({
                success: false,
                message: 'Agent Data Not Found...'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Agent Data Found Successfullyy..',
            GetAlldata
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({ AgentLogin, GetByData, AgentAdd })