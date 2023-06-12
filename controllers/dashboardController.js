const express = require("express");
const router = express.Router();
const { User, BlogPost } = require("../models");
const withAuth = require("../utils/auth");

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

module.exports = router;
