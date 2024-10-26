const express = require('express');

const routes = express.Router();

const agentController = require('../controllers/agentController');

const TokenVerify = require('../middelware/adminToken');

//Routes
routes.post('/', TokenVerify, agentController.AgentAdd);

routes.post('/login', TokenVerify, agentController.AgentLogin);

module.exports = routes; 