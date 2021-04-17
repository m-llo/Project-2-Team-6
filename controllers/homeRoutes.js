const router = require('express').Router();
require('dotenv').config();
// how to search by either url or unique video_id
const ytApiKey = process.env.API_SECRET;
const fetch = require("node-fetch");

const nodemailer = require('nodemailer');

const { Hobby, User, Videos, Notes } = require('../models');
const withAuth = require('../utils/auth');
const newVideoSearch = require('../utils/newvideosearch');


router.get('/login', async (req, res) => {
    // If a session exists, redirect the request to the homepage
    try{
      res.render('login');
    }catch (err) {
      console.log(err); 
      return res.status(500).json(err);
  }
       
});

router.get('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
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


router.get('/video/:id', withAuth, async (req, res) => {
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


// router.get('/video/:id', withAuth, async (req, res) => {
//   try {
//       const dbvideoData = await Videos.findByPk(req.params.id);
//       const singlevideo = dbNotesData.get({ plain: true });
//       console.log(singlevideo);
//           res.render('videoView', { singlevideo, loggedIn: req.session.loggedIn });
  
  
//     }catch (err) {
//       console.log(err); 
//     res.status(500).json(err);
//   }
// });

router.get('/notes/:id', withAuth, async (req, res) => {

  try {
      const dbNotesData = await Notes.findByPk(req.params.id);

      const dbVideoData = await Videos.findAll({where: {video_id: req.body.name}},{
        include:[
          {
            model:Notes,
            attributes:['id', 'title', 'text' ]
          }
      ],
      });
        
      if(!dbNotesData) {
        res.status(404).json({message: 'No notes with this id!'});
        
    }
      const singleNotes = dbNotesData.get({ plain: true });
      console.log(singleNotes);
          res.render('videoView', { singleNotes, loggedIn: req.session.loggedIn });
  
  
    }catch (err) {
      console.log(err); 
    res.status(500).json(err);
  }

});



router.get('/playlist/:id', async (req, res) => {

  console.log("playlist");
  try {
    // console.log("queryname: ", req.query.name);
    // const hobbyName= req.query.name; 
    // console.log("getting videos for:", hobbyName) 
    const videoData = await Videos.findAll({where: {hobby_id: req.params.id}});
    console.log("VideoData", videoData);
    const playList = videoData.map((video) => video.get({ plain: true }));
    console.log(playList)

    const hobbyData = await Hobby.findAll({where: {user_id: req.session.user_id}});
    console.log("hobbyData", hobbyData);
    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));


          res.render('dashboard',  {playList, hobbies, loggedIn: req.session.loggedIn});
          // res.render('dashboard',  {videos, loggedIn: req.session.loggedIn});
  
  
    }catch (err) {
      console.log(err); 
    return res.status(500).json(err);
  }
});

router.get('/newvideos/:hobby', async (req, res) => {
    const hobby = req.params.hobby
  try {
    const hobbyData = await Hobby.findAll({where: {user_id: req.session.user_id}});
    console.log("hobbyData", hobbyData);
    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));  

    const hobbyId = await Hobby.findOne({where: {
      user_id: req.session.user_id,
      name: hobby
    }});
    console.log("hobbyId", hobbyId.id);
    // const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));  

    const ytVideos = await newVideoSearch(hobby)
    const hobby_id= hobbyId.id
    
    console.log("new video results from yt fetch: ", ytVideos)
  res.render('dashboard',  {hobby, ytVideos, hobby_id, hobbies, loggedIn: req.session.loggedIn});
    }catch (err) {
      console.log(err); 
    return res.status(500).json(err);
  }
});


// router.get('/new/hobby/:name', async (req, res) => {

//   keyword
//   try {
//     // console.log("queryname: ", req.query.name);
//     // const hobbyName= req.query.name; 
//     // console.log("getting videos for:", hobbyName) 
//     const videoData = await Videos.findAll({where: {hobby_id: req.params.id}});
//     console.log("VideoData", videoData);
//     const videoList = videoData.map((video) => video.get({ plain: true }));
//     console.log(videoList)


//           res.render('dashboard',  {videoList, loggedIn: req.session.loggedIn});
//           // res.render('dashboard',  {videos, loggedIn: req.session.loggedIn});
  
  
//     }catch (err) {
//       console.log(err); 
//     return res.status(500).json(err);
//   }
// });


module.exports = router;
