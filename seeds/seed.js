const sequelize = require("../config/connection");
const { User, BlogPost } = require("../models");
const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");

async function seedDatabase() {
  await sequelize.sync({ force: true });

  // Seed users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed blog posts
  await BlogPost.bulkCreate(blogPostData);

  console.log("Database seeded successfully");
  process.exit(0);
}

seedDatabase();
