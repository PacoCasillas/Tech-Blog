// Middleware function to check if the user is authenticated
const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    // If user is not logged in, redirect to the login page or send and error response
    res.redirect("/login");
  } else {
    // If user is logged in call the next function to process with the requested route
    next();
  }
};

module.exports = withAuth;
