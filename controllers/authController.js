const router = require("express").Router();
const { User } = require("../models");

// Sign-up route
router.post("/signup", async (req, res) => {
  try {
    // Create a new user with given username and password
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Set the user session after successful sign-up
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: "Sign-up successful!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // Find user with the given username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Invalid username or password!" });
      return;
    }

    // Set the user session after successful login
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: "Login successful!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session and log the user out
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;