const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

// Association between Comment and User models
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Association between Comment and BlogPost models
Comment.belongsTo(BlogPost, {
  foreignKey: "blogpost_id",
});

// Association between User and Comment models
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Association between BlogPost and Comment models
BlogPost.hasMany(Comment, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE",
});

module.exports = { User, BlogPost, Comment };
