const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");
const BlogPost = require("./BlogPost");

class Comment extends Model {}

Comment.init(
  {
    // Define the columns of the Comment model

    // Id of the comment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // Content of the comment
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Foreign key referencing the User model's id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    // Foreign key referencing the BlogPost model's id
    blogpost_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogpost",
        key: "id",
      },
    },

    // The date and time when the comment was created
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
    // Set the model name to 'comment'
    modelName: "comment",
  }
);

module.exports = Comment;
