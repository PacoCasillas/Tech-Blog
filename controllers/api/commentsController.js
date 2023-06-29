const router = require("express").Router();
const { Comment, User, BlogPost } = require("../../models");

// Create a comment on a blog post
router.post("/:id/comment", async (req, res) => {
  try {
    const { commented_text } = req.body;
    const blogPostId = req.params.id;
    const userId = req.session.userId;

    // Create a new comment with the provided data
    await Comment.create({
      commented_text,
      user_id: userId,
      blogpost_id: blogPostId,
    });

    // Redirect user back to the blog post after the comment is created
    res.redirect(`/blogPost/${blogPostId}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;