const router = require('express').Router();
const { Notes } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/notes/:id', withAuth, async(req, res)=>{
    try{
        const dbNotesData=await Notes.findByPk(req.params.id);
        const notes = dbNotesData.get({plain:true});
        res.render('videoView', { notes, loggedIn: req.session.loggedIn });
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/notes/:id', async(req, res) => {
    // update a category by its `id` value
    Notes.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        content: req.body.text,
        
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

  router.delete('/notes/:id', async (req, res) => {
    try {
      const dbNotesData = await Posts.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
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