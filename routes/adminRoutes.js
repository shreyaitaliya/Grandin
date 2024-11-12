const express = require('express');

const routes = express.Router();

const adminController = require('../controllers/AdminController');

//Routes

routes.post('/login', adminController.AdminLogin);
routes.post('/', adminController.CompanyAdd);
routes.get('/', adminController.getdata);

module.exports = routes; 