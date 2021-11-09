const { User } = require("../models");

const userData = [
  {
    username: "nick",
    password: "123456789",
  },
  {
    username: "nik22cool4u",
    password: "abcdefg",
  },
  {
    username: "nikkpi",
    password: "vwxyz",
  },
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;
