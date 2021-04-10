const router = require('express').Router();
const { Hobby, User, Videos, Notes } = require('../../models');
const withAuth = require('../../utils/auth');
const hobbySearch = require('../../utils/hobbysearch');
const videoSearch = require('../../utils/videosearch');

router.post('/new', withAuth, async (req, res) => {
    try {
        const newHobby = await Hobby.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newHobby);
    const hobby= newHobby.name;
       
     const hobbyData = hobbySearch(hobby)
        // push hobbydata to an array called newHobbyInfo to allow us to grab what we want.and post to handlebars 
     res.render('dashboard', { newHobbyInfo, loggedIn: req.session.loggedIn });
    //  handlebars renders cards for each video so the user can choose a video to view
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const hobbyData = await User.findByPk(req.params.id,{
        include:[
             {
                model: Hobby,
                attributes:[
                    'name',
                    'id'
                ]
             }
        ]
      })
    // need to figureout how to make sure this is searching by user_id and not hobby_id
    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));

    const videoData = await User.findByPk(req.params.id,{
        include:[
             {
                model: Videos,
                attributes:[
                    'title',
                    'id',
                ]
             }
        ]
      });
    
    const videos = videoData.map((video) => video.get({ plain: true }));
        
    res.render('dashboard', { hobbies, videos, loggedIn: req.session.loggedIn });
      }catch (err) {
      res.status(500).json(err);
    }
  });

// when user clicks delete button next to video
router.delete('delhobby/:id', withAuth, async (req, res) => {
    try {
        const hobbyData = await Hobby.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!hobbyData) {
            res.status(404).json({ message: 'Hobby not found.'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
// when user clicks delete button next to video
router.delete('delvideo/:id', withAuth, async (req, res) => {
    try {
        const videoData = await Videos.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!videoData) {
            res.status(404).json({ message: 'video not found'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
// add on frontend  fetch with the URL adding the video id on th end when user clicks li nav
// add youtube api fetch by video.video_id.url
router.get('/dashboard/video/view', withAuth, async (req) => {
    
    
    try{

// get saved notes
        const videoData = await Video.findByPk(req.params.id,{
        include:[
             {
                model: Notes,
                attributes:[
                    'title',
                    'text',
                    'id',
                ]
             }
        ]
      });
    
    const videos =  video.get({ plain: true });
    const video = videos.video_id
// youtube by video_id into the search function
  const  ytVideo =  videoSearch(video)
    // take the repsonse from the videoSearch function
    res.render('videoView', { videos, ytVideo, loggedIn: req.session.loggedIn });
      }catch (err) {
      res.status(500).json(err);
    }
  });

//   trigger Youtube api search by keyword using hobbysearch function frontend will include hobby id
  router.get('/dashboard/hobby/:id', withAuth, async (req, res) => {
    try{
    const hobbyData = await Hobby.findByPk(req.params.id,{
        include:[
             {
                model: Videos,
                attributes:[
                    'title',
                    'thumbnail',
                    'description',
                    'youtube_id',
                    'URL',
                    'id',
                ]
             },
             {
                model: Notes,
                attributes:[
                    'title',
                    'text',
                ]
             }
        ]
      });
    
    const savedHobbyInfo =  hobby.get({ plain: true });
        
    res.render('dashboard', { savedHobbyInfo, loggedIn: req.session.loggedIn });
      }catch (err) {
      res.status(500).json(err);
    }
  });
// handlebars will need to render a card for each video title at the top, 

// need a Video.create post funciton at to req userid is req.params.id






module.exports = router;