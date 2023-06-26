const router = require("express").Router();

const userRoutes = require("./userController.js");
const blogPostRoutes = require("./blogPostController");
const commentsRoutes = require("./commentsController");

router.use("/", userRoutes);
router.use("/blogPostController", blogPostRoutes);
router.use("/commentsController", commentsRoutes);

module.exports = router;