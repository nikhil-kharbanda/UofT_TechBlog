const { Post } = require("../models");

const postData = [
  {
    title: "Magic mirror",
    content: "A great home automation project.",
    user_id: 1,
  },
  {
    title: 'Building personal "Netflix" server',
    content: "Allows to control personal media",
    user_id: 2,
  },
  {
    title: "RC car proximity system",
    content: "Simulated car collision with RC cars",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
