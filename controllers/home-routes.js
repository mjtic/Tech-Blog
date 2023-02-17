const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

/*
WHEN I visit the site for the first time
THEN I am presented with the homepage, 
which includes existing blog posts if any have been posted;

navigation links for the homepage and the dashboard (nav-bar);
and the option to log in (nav-bar);
*/

// GET all blogposts for homepage
router.get('/', (req, res) => {
  Post.findAll({
          attributes: [
              'id',
              'title',
              'content',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// GET ID
//*** res.render needs single view page (handlebar)***//
router.get('/post/:id', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'content',
              'title',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = dbPostData.get({ plain: true });
          console.log(post);
          res.render('single-post', { post, loggedIn: req.session.loggedIn });


      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
//Post Comments
router.get('/posts-comments', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'content',
              'title',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = dbPostData.get({ plain: true });

          res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});






module.exports = router;


/*
Class note:

controllers
    index.js - connects
    home-routes - router.get
        api 
            index.js - connects
            -routes - router.post/delete 
*/
