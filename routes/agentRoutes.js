const express = require('express');

const routes = express.Router();

const agentController = require('../controllers/agentController');


routes.post('/login', agentController.AgentLogin);

routes.get('/', agentController.GetByData);

routes.post('/', agentController.AgentAdd);

module.exports = routes; 