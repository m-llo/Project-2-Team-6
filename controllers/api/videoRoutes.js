const router = require('express').Router();
const { Videos } = require('../../models');
const withAuth = require('../../utils/auth');



// router.get('/', withAuth, async (req, res) => {
//     try {
//       const videoData = await Videos.findByPk(req.params.id)
    
//     const videos = videoData.map((video) => video.get({ plain: true }));
//         res.render('dashboard', { videos, loggedIn: req.session.loggedIn });
//       }catch (err) {
//       res.status(500).json(err);
//     }
//   });

router.delete('/id', withAuth, async (req, res) => {
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



module.exports = router;