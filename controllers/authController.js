const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");

// Render the homepage with existing blog posts
router.get("/", async (req, res) => {
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
  res.render("homepage", { blogPosts, logged_in: req.session.logged_in });
});

// Render a specific blog post by ID
router.get("/blogpost/:id", async (req, res) => {
  // Find a specific blog post by ID, including associated user and comment data
  const blogPostData = await BlogPost.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ["username"] },
      { model: Comment, include: { model: User, attributes: ["username"] } },
    ],
  });

  // If the blog post is not found, return a 404 status and error message
  if (!blogPostData) {
    res.status(404).json({ message: "No blog post found with this ID!" });
    return;
  }

  // Extract a plain JavaScript object from the retrieved blog post data
  const blogPost = blogPostData.get({ plain: true });

  // Render the "blogpost" view template with the blog post and login status
  res.render("blogpost", { blogPost, logged_in: req.session.logged_in });
});

// Create a new comment for a blog post
router.post("/comment", async (req, res) => {
  // If the user is logged in, create a new comment with the provided content, user ID, and blog post ID
  if (req.session.logged_in) {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blogpost_id: req.body.blogpost_id,
    });

    // Return the created comment as a JSON response
    res.status(200).json(newComment);
  } else {
    // If the user is not logged in, return a 401 status and error message
    res.status(401).json({ message: "You must be logged in to comment!" });
  }
});

// Render the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle the login form submission
router.post("/login", async (req, res) => {
  try {
    // Check if the user exists in the database
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    // If the user doesn't exist, display an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the provided password with the stored password hash
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, display an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Save the user's ID and logged_in status to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
