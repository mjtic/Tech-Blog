const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
      const blogPostData = await Post.findAll({
        where: {user_id: req.session.user_id}
      });
      // serialize the data
      const posts = blogPostData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render("dashboard", { posts, logged_in: req.session.logged_in });
    } catch (err) {
      res.status(400).json(err.message);
    }
  });
  
  module.exports = router;