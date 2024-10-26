const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate().then(() => {
    console.log('connected');
}).catch((error) => {
    console.log(error);
    return false;
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false, alter: false }).then(() => {
    console.log('yes re-sync');
});

module.exports = db;
