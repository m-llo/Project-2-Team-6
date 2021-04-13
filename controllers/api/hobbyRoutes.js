const router = require('express').Router();

const { Hobby, User, Videos, Notes } = require('../../models');
const withAuth = require('../../utils/auth');
const hobbySearch = require('../../utils/hobbysearch');
const videoSearch = require('../../utils/videosearch');

router.post('/new/hobby', withAuth, async (req, res) => {
    try {
        const newHobby = await Hobby.create({
            name: req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newHobby);
    const hobbies = newHobby;
       
     const hobbyData = hobbySearch(hobby)
        // push hobbydata to an array called newHobbyInfo to allow us to grab what we want.and post to handlebars 
     res.render('dashboard', { hobbies, loggedIn: req.session.loggedIn })
        res.status(500).json(err);
    //  handlebars renders cards for each video so the user can choose a video to view
    } catch (err) {
        res.status(400).json(err);
    }
});
// populates all user related hobbies on the side of the screeen
router.get('/', withAuth, async (req, res) => {
    console.log("hobby get route hit")
    try {
      const hobbyData = await User.findByPk(req.session.user_id, {

        include:[
             {
                model: Hobby
             }
        ]
      })
    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));
    console.log('hobbies', hobbies)
    res.render('dashboard', { hobbies });
      }catch (err) {
      res.status(500).json(err);
    }
  });

// when user clicks delete button next to hobby on My hobbies
router.delete('/delete/', withAuth, async (req, res) => {
    try {
        const hobbyData = await Hobby.destroy({
            where: {
                id: req.body.id,
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


//   trigger Youtube api search by keyword using hobbysearch function frontend will include hobby id
//   router.get('/dashboard/hobby/:id', withAuth, async (req, res) => {
//     try{
//     const hobbyData = await Hobby.findByPk(req.params.id,{
//         include:[
//              {
//                 model: Videos,
//                 attributes:[
//                     'title',
//                     'thumbnail',
//                     'description',
//                     'youtube_id',
//                     'URL',
//                     'id',
//                 ]
//              },
//              {
//                 model: Notes,
//                 attributes:[
//                     'title',
//                     'text',
//                 ]
//              }
//         ]
//       });
    
//     const savedHobbyInfo =  hobby.get({ plain: true });
        
//     res.render('dashboard', { savedHobbyInfo, loggedIn: req.session.loggedIn });
//       }catch (err) {
//       res.status(500).json(err);
//     }
//   });
//   router.get('/dashboard/gethobby/:id', withAuth, async (req, res) => {
//     try{
//     const hobbyData = await Hobby.findOne({where:{name:req.params.id}});
//     const hobby = hobbyData.JSON()
//     const hobbyId = hobby.id;
//     console.log(hobbyId)
//     return hobbyId
//       }catch (err) {
//       res.status(500).json(err);
//     }
//   });





module.exports = router;