const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

/*******DO NOT forget to add withAuth back in once ready */
router.post("/", withAuth, async (req, res) => {
    try {
      console.log(req.body);
      const newComment = await Comment.create({
      
        user_id: req.session.user_id,
        post_id: req.body.post_id,
        content: req.body.content
  
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;
  