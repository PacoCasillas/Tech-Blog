const { BlogPost } = require("../models");

const blogPostData = [
    {
      title: "Getting Started with Web Development",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_by: 1,
      createdAt: "2023-01-10"
    },
    {
      title: "The Future of Artificial Intelligence",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_by: 2,
      createdAt: "2023-02-15"
    },
    {
      title: "Mastering Mobile App Development",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_by: 3,
      createdAt: "2023-03-20"
    },
    {
      title: "Introduction to Data Science",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_by: 4,
      createdAt: "2023-04-25"
    },
    {
      title: "Cybersecurity Best Practices",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_by: 5,
      createdAt: "2023-05-30"
    },
  ];

const seedBlogPosts = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedBlogPosts;