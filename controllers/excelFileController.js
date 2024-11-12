const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const XLSX = require('xlsx');
const Excelfile = require('../models/uploadExcelFileModel')(sequelize, DataTypes);
const yourmodel = require('../models/yourmodel')(sequelize, DataTypes);
const AgentModel = require('../models/agentModel');


const AddExcelFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "Please upload an Excel file." });
        }

        // Read the Excel file using xlsx
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Find the agent user by username
        const FindagentUser = await AgentModel.findOne({ where: { username: req.body.username } });
        if (!FindagentUser) {
            return res.status(400).send({
                success: false,
                message: 'Cannot find this user.'
            });
        }

        // Save file metadata to the database
        const fileData = {
            username: req.body.username,
            excelfile: req.file.filename, // Store the file name
            createdBy: 'company123', // Replace this with actual user data
        };

        const savedFile = await Excelfile.create(fileData);

        // Now, insert the data from the Excel file into the database
        for (const row of sheetData) {
            // You may want to validate the row data here before saving

            // Create an entry in your desired model       
            await yourmodel.create({
                // Map the Excel row fields to your model fields
                Name: row.Name, // Adjust according to your Excel column names
                contactnumber: row.ContactNumber, // Adjust according to your Excel column names
                email: row.EmailId, // Adjust according to your Excel column names
                company: row.Company, // Adjust according to your Excel column names
                website: row.Website, // Adjust according to your Excel column names
                bussinesstype: row.BusinessType, // Adjust according to your Excel column names
                // Add other fields as necessary
                excelfileID: savedFile.excelfileID // Assuming you want to relate this data to the uploaded file
            });
        }

        res.status(201).send({
            message: "File uploaded successfully and data imported.",
            data: savedFile,
            sheetData // Send back the parsed Excel data if needed
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Error uploading file", error: error.message });
    }
};



// Add ExcelFile
const GetExcelFiles = async (req, res) => {
    try {
        const excelFiles = await yourmodel.findAll();

        // Check if there are any files
        if (excelFiles.length === 0) {
            return res.status(404).send({ message: "No Excel files found." });
        }

        // Send the retrieved files in the response
        res.status(200).send({
            message: "Excel files retrieved successfully",
            data: excelFiles,
        });
    } catch (error) {
        res.status(500).send({ message: "Error retrieving files", error });
    }
};
   

module.exports = {
    AddExcelFile, GetExcelFiles
};

