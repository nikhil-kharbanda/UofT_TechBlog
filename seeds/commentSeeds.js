const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Interesting",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "Looks good",
    user_id: 2,
    post_id: 3,
  },
  {
    comment_text: "Great Work",
    user_id: 1,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
