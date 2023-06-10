require("dotenv").config({ path: "../.env" });
const Sequelize = require("sequelize");

// Create a new Sequelize instance with the database credentials from the .env file
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
