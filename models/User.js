const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  // Method to check if the provided password matches the hashed password in the database
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    // Define the columns of the User Model

    // # Id of the User
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primeryKey: true,
      autoIncremement: true,
    },
    // Username of user
    username: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    // Email of user
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // User password
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // Hash the password before saving it to the database
      beforeCreate: async (newUserData) => {
        if (newUserData.password) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
        }
        return newUserData;
      },
      // Hash the password before updating it in the database
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
        }
        return updatedUserData;
      },
    },
    // Sequelize instance for managing the database connection
    sequelize,
    // Disable automatic generation of createdAt and updatedAt columns
    timestamps: false,
    // Use the model name as the table name without pluralization
    freezeTableName: true,
    // Use underscored naming convention for attributes
    underscored: true,
    // Set te model name to 'user'
    modelName: "user",
  }
);

module.exports = User;