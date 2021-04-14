const router = require('express').Router();

const { Hobby, User, Videos, Notes } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // if (req.session.logged_in) {
  //   // alert('Welcome back, you are currently signed in. Click OK to proceed to your dashboard.');    
  //   res.redirect('/api/dashboard');
  //       return;
  //     }else{
  try {
    res.render('login');
  } catch (err) {
    res.json(err);
    console.log(err);
//  }
}
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


router.get('/dashboard', async (req, res) => {
  try {
      
     
          res.render('dashboard');
  
  
    }catch (err) {
      console.log(err); 
    res.status(500).json(err);
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

module.exports = router;
