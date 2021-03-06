const router = require('express').Router();
// const { response } = require('express');
const { Notes, User, Hobby, Videos } = require('../../models');
const withAuth = require('../../utils/auth');



// router.get('/:id', withAuth, async(req, res)=>{
//   try{
//       const dbNotesData=await Notes.findByPk(req.session.user_id);
//       const notes = dbNotesData.get({plain:true});
//       res.render('videoView', { notes, logged_in: req.session.logged_in });
//   } catch (err){
//       console.log(err);
//       res.status(500).json(err);
//   }
// });





// CREATE new Notes
router.post('/save', async (req, res) => {
  console.log("route");
  try {
    const dbNotesData = await Notes.create({
      title: req.body.title,
      text: req.body.text,
      videos_id: req.body.videos_id,
    });

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbNotesData);
      
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/update/:id', async(req, res) => {
    // update a node by its `id` value
    Notes.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        text: req.body.text,
        videos_id: req.body.videos_id,
      },
      {
        // Gets a book based on the book_id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    ) .then((updateNotes) => {

      res.status(200).json(updateNotes);
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const dbNotesData = await Notes.destroy({
        where: {
         
          id: req.params.id,
        },
      });
  
      if (!dbNotesData) {
        res.status(404).json({ message: 'No notes found with this id!' });
        return;
      }
  
      
      res.status(200).json(dbNotesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;