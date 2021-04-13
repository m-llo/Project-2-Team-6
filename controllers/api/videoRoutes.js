const router = require('express').Router();
const { Videos } = require('../../models');
const withAuth = require('../../utils/auth');
const {savedVideoSearch, newVideoSearch} = require('../../utils/videosearch');




router.get('/', withAuth, async (req) => {
    const hobby = req.body.name
    try{
        const getVideos = newVideoSearch(hobby)
    
    const ytvideos = getVideos.map((video) => video.get({ plain: true }));
    // take the repsonse from the videoSearch function
    res.render('dashboard', { ytvideos, logged_in: req.session.logged_in });
      }catch (err) {
      res.status(500).json(err);
    }
  });


router.post('/save', withAuth, async (req, res) => {
    try {
        const newVideo = await Videos.create({
            ...req.body,
        
        });

        res.status(200).alert("video Saved");
    } catch (err) {
        res.status(400).json(err);
    }
});

// when user clicks delete button next to video
router.delete('/delete/:id', withAuth, async (req, res) => {
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
router.get('/view', withAuth, async (req) => {
    try{
        const videoData = await Videos.findOne({where: youtube_id = req.body.id,
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
    
    const video =  videoData.get({ plain: true });
    const ytId = video.youtube_id
// youtube by video_id into the search function
  const  getVideo =  savedVideoSearch(ytId)

  const ytVideo = getVideo.map((video) => video.get({ plain: true }));
    // take the repsonse from the videoSearch function
    res.render('videoView', { ytVideo, logged_in: req.session.logged_in });
      }catch (err) {
      res.status(500).json(err);
    }
  });




 

  router.get('/playlist', withAuth, async (req) => {
    try{
        const videoData = await Videos.findOne({where: {name:req.body.name}});
        
    
    const playlist = videoData.map((videos) => videos.get({ plain: true }));
   
    res.render('dashboard', { playlist, logged_in: req.session.logged_in });
      }catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;