// blogPostController.js
const router = require("express").Router();
const { BlogPost} = require("../../models");

// Create a new blog post
router.post("/", async (req, res) => {
  try {

    // Create a new blog post with given data
      await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      // userId: req.session.user_id,
      userId: 1, // hardcoded user ID for testing
      posted_by: "Batman", // hardcoded user ID for testing
      created_by: 1, // Hardcoded user ID for testing
      createdAt: new Date()
    });

    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Update an existing blog post -> http://localhost:3001/api/blogposts/:id
router.put("/:id", async (req, res) => {
  try {
    // Update the title and content of the blog post with the given ID
    const blogPostData = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
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

    // Send success status to indicate successful deletion
    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;