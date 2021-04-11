const router = require('express').Router();

const userRoutes = require('./userRoutes');
const hobbyRoutes = require('./hobbyRoutes');
const videoRoutes = require('./videoRoutes');


router.use('/user', userRoutes);
router.use('/dashboard', hobbyRoutes);

router.use('/videos', videoRoutes)
module.exports = router;