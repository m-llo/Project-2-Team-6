const router = require('express').Router();
const { User } = require('../models');
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


router.get('/', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// router.get('/notes/:id', withAuth, async(req, res)=>{
//   try{
//       const dbNotesData=await Notes.findByPk(req.params.id);
//       const notes = dbNotesData.get({plain:true});
//       res.render('videoView', { notes, loggedIn: req.session.loggedIn });
//   } catch (err){
//       console.log(err);
//       res.status(500).json(err);
//   }
// });


module.exports = router;
