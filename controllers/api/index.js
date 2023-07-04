const router = require("express").Router();

const userRoutes = require("./userController.js");
const blogPostRoutes = require("./blogPostController");
const commentsRoutes = require("./commentsController");
const userController = require("./userController.js");

router.use("/", userRoutes);
router.use("/blogpost", blogPostRoutes);
router.use("/comments", commentsRoutes);
router.use("/user", userController);


module.exports = router;