const router = require('express').Router();

const { Hobby, User, Videos, Notes } = require('../../models');
const withAuth = require('../../utils/auth');
const hobbySearch = require('../../utils/hobbysearch');
const newVideoSearch = require('../../utils/newvideosearch');

router.post('/new/hobby', async (req, res) => {
    console.log(res);
    console.log("new hobby post route: ", req.body.name)

    try {
        const newHobby = await Hobby.create({
            name: req.body.name,
            user_id: req.session.user_id,
        });
        res.status(200).json(newHobby);
        console.log("new hobby added:", newHobby)

    } catch (err) {
       
        res.status(400).json(err);
        return
    }
});


// when user clicks delete button next to hobby on My hobbies
router.delete('/delete/:id', async (req, res) => {
    console.log('hobby delete route hit');
    try {
        const hobbyData = await Hobby.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
        });
        res.status(200);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})






module.exports = router;