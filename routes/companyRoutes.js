const express = require('express');

const routes = express.Router();

const companyController = require('../controllers/companyCOntroller');

const TokenVerify = require('../middelware/agentToken');

//Routes   
routes.post('/', TokenVerify, companyController.CompanyAdd);

module.exports = routes; 