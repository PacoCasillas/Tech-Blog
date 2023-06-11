const express = require("express");
const router = express.Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get a specific blog post by ID
router.get("/:id", async (req, res) => {
  try {
    // Find blog post with ID and include the author's username
    const blogPost = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    // Render blog post view with retrieved data
    res.render("post", { blogPost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a comment on a blog post
router.post("/:id/comment", async (req, res) => {
  try {
    const { content } = req.body;
    const blogPostId = req.params.id;
    const userId = req.session.userId;

    // Create a new comment with the provided data
    await Comment.create({
      content,
      userId,
      blogPostId,
    });

    // Redirect user back to the blog post after the comment is created
    res.redirect(`/blogPost/${blogPostId}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new blog post
router.post("/new", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId;

    // Create a new blog post with given data
    await BlogPost.create({
      title,
      content,
      userId,
    });

    // Redirect the user back to the dashboard after making a blog post
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogPostId = req.params.id;

    // Update the title and content of the blogpost with given ID
    await BlogPost.update(
      {
        title,
        content,
      },
      {
        where: {
          id: blogPostId,
        },
      }
    );

    // Redirect the user back to the dashboard after the blog post is updated
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete an existing blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogPostId = req.params.id;

    // Delete the blog post with specified ID
    await BlogPost.destroy({
      where: {
        id: blogPostId,
      },
    });

    // Send success status to indicate successful deletion
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;