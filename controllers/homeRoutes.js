const router = require('express').Router();
const { User, Notes, Videos, Hobby } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const users = userData.map((hobby) => hobby.get({ plain: true }));

    res.render('dashboard', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  console.log ("hi")
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  console.log("login route");
  res.render('login');
});
// ,  withAuth
// , loggedIn: req.session.loggedIn

router.get('/Notes/:id', withAuth, async (req, res) => {
    try {
        const dbVideoData = await Videos.findByPk(req.params.id,{
          include:[
            {
              model:Notes,
              attributes:['id', 'title', 'text' ]
            }
        ],
        });
        const NotesList = dbVideoData.get({ plain: true });
        console.log(NotesList);
            res.render('videoView', { NotesList, loggedIn: req.session.loggedIn });
    
    
      }catch (err) {
        console.log(err); 
      res.status(500).json(err);
    }
  });

router.get('/', async (req, res) => {
  // console.log(req.params.id);
  try {
    const dbUserData = await User.findAll({
     
      
      
      
      include: [
        
        {
          model: Hobby,
          attributes:['id', 'name', 'user_id'],
          include:[
            {
              model: Videos,
              attributes: ['id', 'title', 'youtube_id', 'URL', 'thumbnail', 'description'],
              include:[
                {
                  model:Notes,
                  attributes:['id', 'title', 'text' ]
                }
              ]
            },
          ]
        },
        
        

      ],
    });
    console.log (user);
    const user = dbUserData.map((user) =>
    user.get({ plain: true })
    );
   
    res.render('videoView', {
      user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  res.send('Hello');
});


module.exports = router;
