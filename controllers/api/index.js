const router = require('express').Router();

// create new users, sign-in, sign-out
const usersRoutes = require('./usersRoutes');
// create blog posts and deletes
const postsRoutes = require('./postsRoutes');
// create comments to existing posts
const commentsRoutes = require('./commentsRoutes')


router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;

