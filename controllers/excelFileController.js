const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const XLSX = require('xlsx');
const Excelfile = require('../models/uploadExcelFileModel')(sequelize, DataTypes);

const AddExcelFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "Please upload an Excel file." });
        }

        // Read the Excel file using xlsx
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Example: Save file metadata to the database
        const fileData = {
            excelfile: req.file.filename, // store the file name
            createdBy: req.admin.username, // You can replace this with actual user data
        };

        const savedFile = await Excelfile.create(fileData);

        res.status(201).send({
            message: "File uploaded successfully",
            data: savedFile,
            sheetData // send back the parsed Excel data if needed
        });
    } catch (error) {
        res.status(500).send({ message: "Error uploading file", error });
    }
};


// Add ExcelFile
const GetExcelFiles = async (req, res) => {
    try {
        const excelFiles = await Excelfile.findAll();

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

