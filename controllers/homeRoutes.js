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

router.get('/notes/:id', withAuth, async(req, res)=>{
  try{
      const dbNotesData=await Notes.findByPk(req.params.id);
      const notes = dbNotesData.get({plain:true});
      res.render('videoView', { notes, loggedIn: req.session.loggedIn });
  } catch (err){
      console.log(err);
      res.status(500).json(err);
  }
});

// GET all Notes for videoView
router.get('/notes/:id', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      id: req.params.id,
      include: [
        
        {
          model: Hobby,
          attributes:['id', 'name', 'user_id']
        },
        {
          model: Videos,
          attributes: ['id', 'title', 'youtube_id', 'URL', 'thumbnail', 'description'],
        },
        {
          model:Notes,
          attributes:['id', 'title', 'text' ]
        }

      ],
    });

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
});


module.exports = router;
