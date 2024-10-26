const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const companyModel = require("../models/companyModel")(sequelize, DataTypes);

//Add Admin
const CompanyAdd = async (req, res) => {
    try {
        const { companyname, username, mobilenumber } = req.body
        const createdBy = req.admin.username

        const AddData = await companyModel.create({ companyname, username, mobilenumber, createdBy })

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

module.exports = ({ CompanyAdd })