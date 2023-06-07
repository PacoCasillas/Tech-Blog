const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');



seedDatabase();