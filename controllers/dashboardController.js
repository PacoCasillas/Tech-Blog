const express = require('express');
const router = express.Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged-in user
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
    });

    // Find all blog posts created by the user
    const blogPostsData = await BlogPost.findAll({
      where: { user_id: req.session.userId },
      order: [["created_at", "DESC"]],
      include: { model: User, attributes: ["username"] },
    });

    // Serialize user and blog post data
    const user = userData.get({ plain: true });
    const blogPosts = blogPostsData.map((post) => post.get({ plain: true }));

    // Render the dashboard view with user and blog post data
    res.render("dashboard", { user, blogPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST new blog post
router.post("/new", withAuth, async (req, res) => {
  try {
    // Create a new blog post with the given title, content and user_id
    const newPostData = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    // Redirect the user back to the dashboard
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the blog post with the specified id
    await BlogPost.destroy({ where: { id: req.params.id } });

    // Send a success status
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
