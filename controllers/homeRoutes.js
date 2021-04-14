const router = require('express').Router();
const { User } = require('../models')
const { Hobby } = require('../models')
const { Notes } = require('../models')
const { Videos } = require('../models')
const nodemailer = require('nodemailer');


router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.json(err);
    console.log(err);
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
