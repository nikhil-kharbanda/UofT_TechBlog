const { User } = require("../models");

const userData = [
  {
    username: "nick",
    password: "123456789",
  },
  {
    username: "ethan",
    password: "abcdefg",
  },
  {
    username: "cal",
    password: "987654321",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;
