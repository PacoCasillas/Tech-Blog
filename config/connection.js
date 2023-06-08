const Sequelize = require("sequelize");
require("dotenv").config();

// Create a new Sequelize instance with the databse credentials from the .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  }
);

module.exports = sequelize;
