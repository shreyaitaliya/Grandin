const express = require('express');

const routes = express.Router();

const adminController = require('../controllers/AdminController');

const TokenVerify = require('../middelware/superadmintoken');

//Routes
routes.post('/', TokenVerify, adminController.AdminAdd);

routes.post('/login', TokenVerify, adminController.AdminLogin);

module.exports = routes; 