const router = require('express').Router();
const { Post, Comment, User } = require('../models');


/*
WHEN I visit the site for the first time
THEN I am presented with the homepage, 
which includes existing blog posts if any have been posted;

navigation links for the homepage and the dashboard (nav-bar);
and the option to log in (nav-bar);
*/

// GET all blogposts for homepage
router.get('/', async(req,res)=>{
    try{
        const blogPostData = await Post.findAll({
            include: [
                {
                    model: User,
                },
            ]
        });
        // serialize the data
        const posts = blogPostData.map((post)=> post.get({plain : true }))
         // Pass serialized data and session flag into template
        res.render("homepage", { posts })
    } catch (err) { res.status (400).json(err.message)}
});

// GET ID

// router.get('/post/:id', async (req, res) =>{
//     try{
//         const blogPostData = await Post.findOne ({
//             include: [
//                 {
//                 model: User,
//                 }
//             ]
//         });
//         const 
//     }
// })

// SIGN UP
router.get('/signup', async(req,res)=>{
  if (req.session.logged_in){
    res.redirect('/dashboard')
    return;
  }
    // Pass serialized data and session flag into template
    res.render("signup")
    return;
    } 
);

// LOG IN
router.get('/login', async(req,res)=>{
    if (req.session.logged_in){
      res.redirect('/dashboard')
      return;
    }
      // Pass serialized data and session flag into template
      res.render("login")
      return;
      } 
  );
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