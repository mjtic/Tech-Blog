const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");


//don't forget to add withAuth back later//

router.get("/", withAuth, async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [User],
    });
    // serialize the data
    const posts = blogPostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// AFTER CLICK ON NEW POST BUTTON
router.get('/new', withAuth, (req, res) => {

  res.render('new');
});

// WHEN WE CLICK ON THE POST ITSELF
router.get('/edit/:id', withAuth, async (req, res) => {
  try {

    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // serializing the data
      const post = postData.get({ plain: true });
      console.log(post);

      res.render('edit')
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});


module.exports = router;
