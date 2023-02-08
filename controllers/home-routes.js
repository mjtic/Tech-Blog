const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// GET all blogposts for homepage
/*
WHEN I visit the site for the first time
THEN I am presented with the homepage, 
which includes existing blog posts if any have been posted;

navigation links for the homepage and the dashboard (nav-bar);
and the option to log in (nav-bar);
*/


router.get('/', async(req,res)=>{
    try{
        const blogPostData = await Post.findAll({
            include: [
                {
                    model: User,
                },
            ]
        });
        const posts = blogPostData.map((post)=> post.get({plain : true }))
        res.render("homepage", { posts })
    } catch (err) { res.status (400).json(err.message)}
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