const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
  
  
    process.exit(0);
  };
  
  seedAll();

// const sequelize = require('../config/connection');
// const { User, Post, Comment } = require('../models');

// const userData = require('./userSeeds.json');
// const postData = require('./postSeeds.json');
// const commentData = require('./commentSeeds.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });


//   const comments = await Comment.bulkCreate(commentData, {
//     individualHooks: true,
//     returning: true,
//   });
//   console.log(comments);

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });
//   console.log(users);

//   const posts = await Post.bulkCreate(postData, {
//     individualHooks: true,
//     returning: true,
//   });
//   console.log(posts);

//   process.exit(0);
// }

// seedDatabase();
