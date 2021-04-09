const router = require('express').Router();
const { Hobby } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newHobby = await Hobby.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newHobby);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/id', withAuth, async (req, res) => {
    try {
        const hobbyData = await Hobby.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!hobbyData) {
            res.status(404).json({ message: ''})
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
