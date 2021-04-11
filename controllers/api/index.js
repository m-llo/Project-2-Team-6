const router = require('express').Router();

const userRoutes = require('./userRoutes');
const hobbyRoutes = require('./hobbyRoutes');
const videoRoutes = require('./videoRoutes');
const noteRoutes = require('./notesRoutes');

router.use('/user', userRoutes);
router.use('/dashboard', hobbyRoutes);
router.use('/notes', noteRoutes);
router.use('/videos', videoRoutes)
module.exports = router;