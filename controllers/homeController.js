const express = require("express");
const router = require("express").Router();
const { BlogPost, User } = require("../models");

// Home route
router.get("/", async (req, res) => {
  try {
    // Fetch all existing blog posts from the database
    const blogPost = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Determine if the user is logged in
    const loggedIn = req.session.loggedIn;

    // Render the homepage view and pass the blog posts and loggedIn status
    res.render("home/index", { blogPost, loggedIn });
  } catch (err) {
    // Handle any errors that occur
    res.status(500).json(err);
  }
});

module.exports = router;
