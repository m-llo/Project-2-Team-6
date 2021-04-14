const router = require('express').Router();
const { User } = require('../models')
const { Hobby } = require('../models')
const { Notes } = require('../models')
const { Videos } = require('../models')
const nodemailer = require('nodemailer');

const { Hobby, User, Videos, Notes } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.json(err);
    console.log(err);
}
});

//  populates all user related hobbies on the side of the screeen
router.get('/hobby/:id', async (req, res) => {
    console.log("hobby get route hit")
    // req.session.user_id=1
    try {
      const hobbyData = await User.findByPk(req.params.id, {

        include:[
             {
                model: Hobby,
                attributes: ["id", "name", "user_id"]
             }
        ]
      })
      console.log("hobbyData 40", hobbyData);
    const hobbies =  hobby.get({ plain: true }); 
    // hobbyData.map((hobby) =>
    // const hobbies = hobbyData.get({ plain: true });
    console.log('hobbies 43', JSON.stringify(hobbies.dataValues))
    // console.log("hobby data[0]", hobbyData[0].hobbies[0])
//     const arrayHobbies={
//         hobbies: hobbyData.hobbies
//    }
//    console.log(arrayHobbies)
//    res.render('dashboard', arrayHobbies);
    res.render('dashboard', { hobbies, loggedIn: req.session.loggedIn});
      }catch (err) {
      res.json(err);
    }
  }
  
  );


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

router.get('/dashboard', async (req, res) => {
  console.log("hobby get route hit")
  try {
  res.render('dashboard');
    }catch (err) {
    res.json(err);
  }
}
);

router.get('/myhobbies', async (req, res) => {
  console.log("hobby get route hit")

  try {
    const hobbyData = await Hobby.findByPk(req.session.user_id)
    console.log("hobbyData", hobbyData);
  // const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));
  const hobbies = hobbyData.get({ plain: true });
    console.log("hobbies plain", hobbies)
    const arrayHobbies=[hobbies]
  
  res.render('dashboard', { arrayHobbies });
    }catch (err) {
    res.json(err);
  }
}

);

module.exports = router;
