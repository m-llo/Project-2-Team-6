const router = require('express').Router();
//const { User } = require('../models')
const { Hobby } = require('../models')
const { Notes } = require('../models')
const { Videos } = require('../models')
const nodemailer = require('nodemailer');

const { Hobby, User, Videos, Notes } = require('../models');
const withAuth = require('../utils/auth');


router.get('/login', async (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
});

    // //  populates all user related hobbies on the side of the screeen
    // router.get('/hobby/:id', async (req, res) => {
    //     console.log("hobby get route hit")
    //     // req.session.user_id=1
    //     try {
    //       const hobbyData = await User.findByPk(req.params.id, {

    //         include:[
    //             {
    //                 model: Hobby,
    //                 attributes: ["id", "name", "user_id"]
    //             }
    //         ]
    //       })
    //       console.log("hobbyData 40", hobbyData);
    //     const hobbies =  hobby.get({ plain: true }); 
    //     // hobbyData.map((hobby) =>
    //     // const hobbies = hobbyData.get({ plain: true });
    //     console.log('hobbies 43', JSON.stringify(hobbies.dataValues))
    //     // console.log("hobby data[0]", hobbyData[0].hobbies[0])
    // //     const arrayHobbies={
    // //         hobbies: hobbyData.hobbies
    // //    }
    // //    console.log(arrayHobbies)
    // //    res.render('dashboard', arrayHobbies);
    //     res.render('dashboard', { hobbies, loggedIn: req.session.loggedIn});
    //       }catch (err) {
    //       res.json(err);
    //     }
    //   }
      
    //   );
// , withAuth
// , loggedIn: req.session.loggedIn
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/dashboard',  withAuth, async (req, res) => {
//   console.log("dashboard");
//   try {
      
     
//           res.render('dashboard',  {loggedIn: req.session.loggedIn});
  
  
//     }catch (err) {
//       console.log(err); 
//     res.status(500).json(err);
//   }
// });

router.get('/dashboard', async (req, res) => {
  console.log("dashboard");
  try {
      
    const hobbyData = await Hobby.findAll({where: {user_id: req.session.user_id}});
    console.log("hobbyData", hobbyData);
    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));


          res.render('dashboard',  { hobbies, loggedIn: req.session.loggedIn});
  
  
    }catch (err) {
      console.log(err); 
    return res.status(500).json(err);
  }
});

  router.get('/hobby/:id', async (req, res) => {
    try {
        const dbHobbyData = await User.findByPk(req.params.id,{
          include:[
            {
              model:Hobby,
              attributes:['id', 'name', 'user_id' ]
            }
        ],
        });
        const hobbyList = dbHobbyData.get({ plain: true });
        console.log(hobbyList);
            res.render('dashboard', { hobbyList });
    
    
      }catch (err) {
        console.log(err); 
      res.status(500).json(err);
    }
  });




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

router.get('/playlist', async (req, res) => {
  console.log("playlist");
  try {
    const hobbyName= req.body.name; 
    console.log("getting videos for:", hobbyName) 
    const videoData = await Videos.findAll({where: {hobby_id: req.body.id}});
    console.log("VideoData", videoData);
    const videos = videoData.map((video) => video.get({ plain: true }));
    console.log(videos)


          // res.render('playlist',  {hobbyName, loggedIn: req.session.loggedIn});
          res.render('playlist',  {hobbyName, videos, loggedIn: req.session.loggedIn});
  
  
    }catch (err) {
      console.log(err); 
    return res.status(500).json(err);
  }
});


module.exports = router;
