const router = require('express').Router();
const { User, Notes, Videos, Hobby } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('dashboard', {
//       users,
//       // Pass the logged in flag to the template
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/videos/:id', withAuth, async (req, res) => {
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
