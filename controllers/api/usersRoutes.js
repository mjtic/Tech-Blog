const router = require("express").Router();
const { User } = require("../../models/");

//find all users
router.get('/', (req, res) => {
  User.findAll({
          attributes: { exclude: ['[password'] }
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

//find one users
router.get('/:id', (req, res) => {
  User.findOne({
          attributes: { exclude: ['password'] },
          where: {
              id: req.params.id
          },
          include: [{
                  model: Post,
                  attributes: [
                      'id',
                      'title',
                      'content',
                      'created_at'
                  ]
              },

              {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'created_at'],
                  include: {
                      model: Post,
                      attributes: ['title']
                  }
              },
              {
                  model: Post,
                  attributes: ['title'],
              }
          ]
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});



// CREATE new user
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
          username: req.body.username,
          password: req.body.password,
        });
    
        req.session.save(() => {
          req.session.user_id = newUserData.id;
          req.session.username = newUserData.username;  
          req.session.loggedIn = true;
    
          res.status(200).json(newUserData);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
      }
    });
  // Login
  router.post('/login', async (req, res) => {
    // console.log(req.body);
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: `${req.body.username} is not a valid username` });
        return;
      }
  
      const validPassword = userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        console.log("Please WoRK!!!")
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    console.log(req.body);
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  

//UPDATE
  router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//DELETE
router.delete('/:id', (req, res) => {
  User.destroy({
          where: {
              id: req.params.id
          }
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});



  module.exports = router;
  