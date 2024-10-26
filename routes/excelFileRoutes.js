// routes/excelFileRoutes.js

const express = require('express');
const routes = express.Router();
const multer = require('multer');
const path = require('path');

const excelController = require('../controllers/excelFileController');
const TokenVerify = require('../middelware/adminToken');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Save file with unique name
    }
});


// File filter to accept only Excel files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only Excel files are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

// Routes
routes.post('/', TokenVerify, upload.single('excelfile'), excelController.AddExcelFile);

routes.get('/', upload.single('excelfile'), excelController.GetExcelFiles);

module.exports = routes;
