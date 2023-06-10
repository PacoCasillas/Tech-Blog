const express = require("express");
const router = express.Router();

const homeController = require("./homeController");
const authController = require("./authController");
const dashboardController = require("./dashboardController");
const blogPostController = require("./blogPostController");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/dashboard", dashboardController);
router.use("/blogPost", blogPostController);

module.exports = router;
