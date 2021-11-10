/* Home routes: This will contain everything the user will see (includes homepage, login, signup) */
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

//At start, show all the posts
router.get("/", (req, res) => {
  //Get all posts
  Post.findAll({
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
      //serialize data before passing through the homepage template
      const posts = postData.map((post) => post.get({ plain: true }));
      //Render homepage. Get all posts (gathered above). If signed im, get the login session, and their username 
      res.render("homepage", { posts, loggedIn: req.session.loggedIn, username:req.session.username });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Render the login page
router.get("/login", (req, res) => {
  //If user already logged in, go to posts feed
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  //Render login
  res.render("login");
});

//Renger the signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

//Render a post when clicked
router.get("/post/:id", (req, res) => {
  //Find the post matching id
  Post.findOne({
    where: {
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
      //If post does not exisit
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      //serialize data before passing through the post templates
      const post = postData.get({ plain: true });
      //Render the singlepost page. Get the post. Check to see if login session is present, and if there is a username avail
      res.render("singlepost", { post, loggedIn: req.session.loggedIn, username:req.session.username });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Redirecting users to see posts with comments
router.get("/postscomments", (req, res) => {
  Post.findOne({
    where: {
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
      //If post data doesnt exist
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      console.log('In postscomments')
       // serialize the data
      const post = postData.get({ plain: true });
      //
      res.render("", { post, loggedIn: req.session.loggedIn, username:req.session.username});
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


module.exports = router;
