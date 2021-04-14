const router = require('express').Router();

const { Hobby, User, Videos, Notes } = require('../../models');
const withAuth = require('../../utils/auth');
const hobbySearch = require('../../utils/hobbysearch');
const videoSearch = require('../../utils/videosearch');

router.post('/new/hobby', async (req, res) => {
    console.log("new hobby post route: ", req.body.name)
    try {
        const newHobby = await Hobby.create({
            name: req.body.name,
            user_id: req.session.user_id,
        });

        res.status(200).json(newHobby);
        console.log("new hobby added:", newHobby)
    // const hobby = newHobby.name;
    // console.log("searching for videos related to: ", hobby)
    // // const ytVideos = hobbySearch(hobby)
    // //  console.log(ytVideos)

    // const allHobbies = await Hobby.findAll({where: {user_id: req.session.user_id}})

    // const hobbies = allHobbies.get({ plain: true });
    //    console.log(hobbies)
    //     // push hobbydata to an array called newHobbyInfo to allow us to grab what we want.and post to handlebars 
    //  res.render('dashboard', { hobbies, loggedIn: req.session.logged_in })
    //     res.status(500).json(err);
    // //  handlebars renders cards for each video so the user can choose a video to view
    } catch (err) {
       res.status(400).json(err);
       return
    }
});

// // populates all user related hobbies on the side of the screeen
router.get('/', async (req, res) => {
    console.log("hobby get route hit")
    req.session.user_id=1
    try {
      const userData = await User.findByPk(req.session.user_id, {

        include:[
             {
                model: Hobby,
                attributes: ["id", "name", "user_id"]
             }
        ]
      })
      console.log("hobbyData 40", hobbyData);
        const hobbies = userData.hobbies
    //const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));
    // const hobbies = hobbyData.get({ plain: true });
    console.log('hobbies 43', JSON.stringify(hobbies.dataValues))
    // console.log("hobby data[0]", hobbyData[0].hobbies[0])
//     const arrayHobbies={
//         hobbies: hobbyData.hobbies
//    }
//    console.log(arrayHobbies)
//    res.render('dashboard', arrayHobbies);
    res.render('dashboard', { hobbies });
      }catch (err) {
      res.json(err);
    }
  }
  
  );

// when user clicks delete button next to hobby on My hobbies
router.delete('/delete/', async (req, res) => {
    try {
        const hobbyData = await Hobby.destroy({
            where: {
                id: req.body.id,
                user_id: req.body.user_id,
            },
        });

        if (!hobbyData) {
            res.status(404).json({ message: 'Hobby not found.'})
        }else{
            res.status(200).json({message: 'Hobby Deleted Successfully.'})
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
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