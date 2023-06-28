// const express = require("express");
const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");

// Home route
router.get("/", async (req, res) => {
  try {
    // Retrieve all blog posts from the database, including associated user and comment data
    const blogPostsData = await BlogPost.findAll({
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: { model: User, attributes: ["username"] } },
      ],
    });

    // Extract plain JavaScript objects from the retrieved blog posts data
    const blogPosts = blogPostsData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    // Render the "homepage" view template with the blog posts and login status
    res.render("homepage", {
      blogPosts: blogPosts,
      // Loggin implementation
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DASHBOARD route
router.get("/dashboard", async (req, res) => {
  try {
    // hardcoded user id for testing
    const userID = 1;

    // const userID = req.session.user_id;
    // Find all blog posts created by the user
    const dashboardData = await BlogPost.findAll({
      where: { created_by: userID },
      attributes: [
        "id",
        "title",
        "content",
        "posted_by",
        "created_by",
        "created_at",
      ],
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["username"] }],
    });
    // Serialize user and blog post data
    let userBlogposts = dashboardData.map((post) => post.get({ plain: true }));
    // Render the dashboard view with user and blog post data
    if (userBlogposts.length === 0) {
      userBlogposts = false;
      res.render("dashboard", {
        userBlogposts,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("dashboard", {
        userBlogposts,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN route
router.get("/login", (req, res) => {
  // Loggin implementation
  // If the user is already logged in, redirect to the dashboard
  // if (req.session.logged_in) {
  //   res.redirect("/dashboard");
  //   return;
  // }
  // Otherwise, render the 'login' template
  res.render("login");
});

// SIGNUP route
router.get("/signup", (req, res) => {
  // Loggin implementation
  // If the user is already logged in, redirect to the dashboard
  // if (req.session.logged_in) {
  //   res.redirect("/dashboard");
  //   return;
  // }
  // Otherwise, render the 'signup' template
  res.render("signup");
});

module.exports = router;
