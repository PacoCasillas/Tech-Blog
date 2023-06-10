const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as the view engine
app.engine("handlebars", exphbs.create({ helpers }).engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session Management
const sess = {
  // Set a strong secret for signing the session ID cookie
  secret: "Super secret secret",
  cookie: {
    // Session cookie configurations
    maxAge: 3600000, // 1 hour in milliseconds
    secure: false, // can use HTTP
    httpOnly: true, // Restrict cookie access to HTTP only
    sameSite: "strict", // Restrict cookie to be sent only on same-site requests
  },
  resave: false, // Whether to save the session if it's unmodified
  saveUninitialized: true, // Whether to save uninitialized sessions
  store: new SequelizeStore({
    // Store the session data in the Sequelize database
    db: sequelize,
  }),
};

app.use(session(sess));

// Routes
app.use(routes);

// Sync sequelize models to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
