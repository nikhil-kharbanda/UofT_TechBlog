/* Dashboard routes. This is where the user can see their own posts, edit, and delete their own posts. */

const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Route to '/' feed (feed that shows the post. Needs to be auth)
router.get("/", withAuth, (req, res) => {
  //Get all posts
  Post.findAll({
    where: {
      //Get the user ID from the session 
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => {
      //serialize data before passing through the handlebar templates
      const posts = postData.map((post) => post.get({ plain: true }));
      //render the dashboard
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn, username:req.session.username});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  //Find 1 post
  Post.findOne({
    where: {
      //Get the post ID from the session 
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => {
      //if post id doesnt exisit
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      //if id exists, serialize data before passing through the handlebar templates
      const post = postData.get({ plain: true });
      //render to edit post
      res.render("editpost", { post, loggedIn: true, username:req.session.username });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create a new post
router.get("/new", (req, res) => {
  res.render("newpost", {loggedIn: true, username:req.session.username});
});

module.exports = router;
