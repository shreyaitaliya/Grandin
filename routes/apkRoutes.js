const express = require('express');

const routes = express.Router();

const apkController = require('../controllers/apkController');

routes.post('/', apkController.apkadd);

routes.get('/', apkController.getdata);


module.exports = routes; 