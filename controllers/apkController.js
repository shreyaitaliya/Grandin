
const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const apkmodel = require("../models/apkDataModel")(sequelize, DataTypes);
const yourmodel = require("../models/yourmodel")(sequelize, DataTypes);

const apkadd = async (req, res) => {
    try {
        const { name, dateandtime, comment, assigned, scheduled, intrested, notintrested } = req.body

        const findData = await yourmodel.findOne({ where: { name: name } })
        if (!findData) {
            return res.status(400).send({
                success: false,
                message: 'name not found..'
            })
        }

        const newEntry = await apkmodel.create({
            name,
            dateandtime,
            comment,
            assigned,
            scheduled,
            intrested,
            notintrested,
        });

        return res.status(201).json({
            success: true,
            message: "Record added successfully",
            data: newEntry,
        });

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
        const findData = await apkmodel.findAll({})
        if (!findData) {
            return res.status(400).send({
                success: true,
                message: 'Data not Find',
                findData
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Data Find Successfully',
            findData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({ apkadd, getdata })