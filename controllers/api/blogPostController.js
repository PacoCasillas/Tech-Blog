// blogPostController.js
const router = require("express").Router();
const { BlogPost, User } = require("../../models");

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    // const { title, content, created_by, created_at } = req.body;

    // Create a new blog post with given data
    const blogPostData = await BlogPost.create({
      blogPost_title: req.body.title,
      blogPost_content: req.body.content,
      blogPost_userId: req.session.user_id,
      blogPost_createdAt: req.body.created_at,
    });

    res.status(200).json(blogPostData);
    // Redirect the user back to home after creating the blog post
    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get the current content of a blog post
router.get("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update an existing blog post
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Update the title and content of the blog post with the given ID
    const blogPostData = await BlogPost.update(
      {
        title,
        content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update the content of a blog post
router.patch("/:id/content", async (req, res) => {
  try {
    const { content } = req.body;

    // Update the content of the blog post with the given ID
    const blogPostData = await BlogPost.update(
      {
        blogPost_content: content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete an existing blog post
router.delete("/:id", async (req, res) => {
  try {
    const blogPostId = req.params.id;

    // Delete the blog post with the specified ID
    const blogPostData = await BlogPost.destroy({
      where: {
        id: blogPostId,
      },
    });

    // Redirect the user back to home after the blog post is updated
    // res.redirect("/home");
    // Send success status to indicate successful deletion
    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;