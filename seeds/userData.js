const { User } = require("../models");
const bcrypt = require("bcrypt");

const userData = [
  {
    username: "Batman",
    email: "batman@example.com",
    password: bcrypt.hashSync("batmanpass", 10),
  },
  {
    username: "Superman",
    email: "superman@example.com",
    password: bcrypt.hashSync("supermanpass", 10),
  },
  {
    username: "Flash",
    email: "flash@example.com",
    password: bcrypt.hashSync("flashpass", 10),
  },
  {
    username: "Harley Quinn",
    email: "harleyquinn@example.com",
    password: bcrypt.hashSync("harleyquinnpass", 10),
  },
  {
    username: "Joker",
    email: "joker@example.com",
    password: bcrypt.hashSync("jokerpass", 10),
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
