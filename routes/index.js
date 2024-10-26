const express = require('express');

const routes = express.Router();

const adminuserController = require('../controllers/superAdminController');

routes.post('/', adminuserController.login)

routes.use('/admin', require('./adminRoutes'));

routes.use('/excel', require('./excelFileRoutes'));

routes.use('/company', require('./companyRoutes'));

routes.use('/agent', require('./agentRoutes'));

module.exports = routes;      