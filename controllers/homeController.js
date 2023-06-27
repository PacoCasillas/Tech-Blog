// const express = require("express");
const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");

// Home route
router.get("/", async (req, res) => {
  try {
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
    res.render("homepage", {
      blogPosts: blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // Get a specific blog post by ID
// router.get("/:id", async (req, res) => {
//   try {
//     // Find blog post with ID and include the author's username and comments
//     const blogPost = await BlogPost.findByPk(req.params.id, {
//       include: [
//         { model: User, attributes: ["username"] },
//         {
//           model: Comment,
//           include: [{ model: User, attributes: ["username"] }],
//         },
//       ],
//     });

//     // Render blog post view with retrieved data
//     res.render("partials/post", { blogPost });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;