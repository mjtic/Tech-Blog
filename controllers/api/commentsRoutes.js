const router = require('express').Router();
const { Comment } = require('../../models/');
// const withAuth = require('../../utils/auth');

/*******DO NOT forget to add withAuth back in once ready */
router.post("/",  async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
  
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete("/:id", withAuth, async (req, res) => {
    try {
      const postData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;
  