const router = require('express').Router();
const { response } = require('express');
const { Notes, User, Hobby, Videos } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const dbUserData = await User.findAll({
      id: req.params.id,
      include: [
        
        {
          model: Hobby,
          attributes:['id', 'name', 'user_id']
        },
        {
          model: Videos,
          attributes: ['id', 'title', 'youtube_id', 'URL', 'thumbnail', 'description'],
        },
        {
          model:Notes,
          attributes:['id', 'title', 'text' ]
        }

      ],
    });

    const user = dbUserData.map((user) =>
    user.get({ plain: true })
    );

    res.render('videoView', {
      user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  res.send('Hello');
});




// CREATE new Notes
router.post('/', async (req, res) => {
  try {
    const dbNotesData = await User.create({
      title: req.body.title,
      text: req.body.text,
      
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbNotesData);
      
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
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

  router.delete('/:id', async (req, res) => {
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