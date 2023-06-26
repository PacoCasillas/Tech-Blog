const router = require("express").Router();
const { BlogPost } = require("../../models");
const { parseBlogPost, insertBlogPost } = require("../../utils/blogPost");

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    // const { title, content, created_by, created_at } = req.body;

    // Create a new blog post with given data
    const blogPostData = await BlogPost.create(req.body);
    let blogPost = parseBlogPost(
      req.body.title,
      req.body.content,
      req.session.user_id,
      req.body.created_at
    );

    await insertBlogPost(blogPost);
    res.status(200).json(blogPostData);
    // Redirect the user back to home after creating the blog post
    res.redirect("/home");
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
    // Redirect the user back to home after the blog post is updated
    res.redirect("/home");
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
