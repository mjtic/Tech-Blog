const router = require('express').Router();



// create new users, sign-in, sign-out
// const usersRoutes = require('./users-routes');
// create blog posts and deletes
const postsRoutes = require('./postsRoutes');
// // create comments to existing posts
// const commentsRoutes = require('./comments-routes')


// router.use('/users', usersRoutes);
router.use('/post', postsRoutes);
// router.use('/comments', commentsRoutes);

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