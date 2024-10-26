const express = require('express');

const routes = express.Router();

const adminuserController = require('../controllers/superAdminController');

routes.post('/', adminuserController.login)

routes.use('/admin', require('./adminRoutes'));

routes.use('/excel', require('./excelFileRoutes'));

module.exports = routes;      