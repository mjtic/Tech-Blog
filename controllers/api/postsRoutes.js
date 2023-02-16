const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

/*******DO NOT forget to add withAuth back in once ready */
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE POST
router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log("here is the req.body", req.body);
    const postData = await Post.update(req.body, {
      where: {
        user_id: req.params.user_id,
      },
    });

    if (postData > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
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
