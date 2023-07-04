const router = require("express").Router();
const { Comment} = require("../../models");

// Create a comment on a blog post
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    // const { commented_text } = req.body;
    const blogPostId = req.body.blogpost_id;
    console.log(blogPostId);
    // const userId = req.session.userId;

    // Create a new comment with the provided data
    await Comment.create({
      commented_text: req.body.commented_text,
      // commented_by: req.session.username,
      commented_by: "Batman", // hardcoded username for testing
      // user_id: req.session.user_id,
      user_id: 1, // hardcoded user ID for testing
      blogpost_id: blogPostId,
      created_at: new Date()
    });

    res.redirect(`/`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update an existing comment
router.put("/:id", async (req, res) => {
  try {
    // Update the comment with the given ID
    const commentData = await Comment.update(
      {
        commented_text: req.body.commented_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete an existing comment
router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;

    // Delete the comment with the specified ID
    const commentData = await Comment.destroy({
      where: {
        id: commentId,
      },
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;