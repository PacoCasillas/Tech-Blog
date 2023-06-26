const sequelize = require("../config/connection");

const seedUsers = require("./userData");
const seedBlogPosts = require("./blogPostData");
const seedComments = require("./commentsData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedBlogPosts();
  console.log("\n----- BLOG POSTS SEEDED -----\n");

  await seedComments();
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedAll();
