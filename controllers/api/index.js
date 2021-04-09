const router = require('express').Router();

const userRoutes = require('./userRoutes');
const hobbyRoutes = require('./hobbyRoutes');

router.use('/user', userRoutes);
router.use('/', hobbyRoutes);

module.exports = router;