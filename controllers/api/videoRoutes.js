const router = require('express').Router();
const { Videos, Hobby } = require('../../models');
const withAuth = require('../../utils/auth');
// const { savedVideoSearch, newVideoSearch } = require('../../utils/videosearch');



router.post('/save', async (req, res) => {
    try {
        // const hobbyid = await Hobby.findOne({
        //     where: {
        //         id: req.body.hobby_Id,
        //         // user_id: req.session.user_id
        //     }
        // });
        console.log("type of hobbyId ", typeof hobbyid)
        // console.log("hobby id line 16 /save: ", hobbyid.id)
        // console.log("type of hobbyId ", typeof hobbyid.id)
        const newVideo = await Videos.create({


          title: req.body.title,
          youtube_id: req.body.youtube_id,
          thumbnail: req.body.thumbnail,
          description: req.body.description,
          hobby_id: req.body.hobby_Id,
          
            
        
        });
        req.session.save(() => {
            req.session.logged_in = true;
      
            res.status(200).json(newVideo);
            // res.status(200).alert("video Saved");
          });    
        
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
        return;

    }
});

// when user clicks delete button next to video
router.delete('/delete/:id', async (req, res) => {
    try {
        const videoData = await Videos.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
            
        });
        res.status(200);
        if (!videoData) {
            res.status(404).json({ message: 'video not found' })
        }
    } catch (err) {
       return res.status(500).json(err);
    }
})

router.get('/view', withAuth, async (req) => {
    try {
        const videoData = await Videos.findOne({
            where: {
                youtube_id: req.body.id,
                include: [
                    {
                        model: Notes,
                        attributes: [
                            'title',
                            'text',
                            'id',
                        ]
                    }
                ]

            }
        });


        const video = videoData.get({ plain: true });
        //  hard code into handlebars iframe the src="https://www.youtube.com/watch?v=" 
        // then add video.youtube_id to the end of the src

        res.render('videoView', { video, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;