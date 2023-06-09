const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class BlogPost extends Model {}

// Define the BlogPost model by extending the Sequelize Model class
// This allows us to interact with the BlogPost table in the database

BlogPost.init(
  {
    // Define the columns of the BlogPost model

    // Id of the blogpost
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // Title of the blog post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Content of the blog post
    content: {
      // I am using text data type to allow more than 255 characters and other
      // type of media added to the content of the blogpost such as images
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Foreign key referencing the User model's id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    // The date and time when the blogpost was created
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Configure the options for the model

    // Sequelize instance for managing the database connection
    sequelize,
    // Disable automatic generation of createdAt and updatedAt columns
    timestamps: false,
    // Use the model name as the table name without pluralization
    freezeTableName: true,
    // Use underscored naming convention for attributes
    underscored: true,
    // Set te model name to 'blogpost'
    modelName: "blogpost",
  }
);

module.exports = BlogPost;
