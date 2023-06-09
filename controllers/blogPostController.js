const { BlogPost, User } = require("../models");
const { Comment } = require("../models");

const blogPostController = {
  // Get a specific blog post by ID
  getBlogPostById: async (req, res) => {
    try {
      const blogPost = await BlogPost.findByPk(req.params.id, {
        include: [{ model: User, attributes: ["username"] }],
      });

      res.render("blogPost/index", { blogPost });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a comment on a blog post
  createComment: async (req, res) => {
    try {
      const { content } = req.body;
      const blogPostId = req.params.id;
      const userId = req.session.userId;

      // create a new comment with the given conentent, user ID, and blog post ID
      await Comment.create({
        content,
        userId,
        blogPostId,
      });

      res.redirect(`/blogPost/${blogPostId}`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = blogPostController;
