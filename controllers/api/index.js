const router = require("express").Router();

const userRoutes = require("./userController.js");
const blogPostRoutes = require("./blogPostController");
const commentsRoutes = require("./commentsController");
// const dashboardRoutes = require("./dashboardController");

router.use("/", userRoutes);
router.use("/blogpost", blogPostRoutes);
router.use("/comments", commentsRoutes);
// router.use("/dashboard", dashboardRoutes);

module.exports = router;