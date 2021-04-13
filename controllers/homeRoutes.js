const router = require('express').Router();


router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    // alert('Welcome back, you are currently signed in. Click OK to proceed to your dashboard.');    
    res.redirect('/api/dashboard');
        return;
      }else{
  try {
    res.render('login');
  } catch (err) {
    res.status(500);
    console.log(err);
  }}
});

module.exports = router;
