const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require('nodemailer');


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    // req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
     
      // send confirmation email using NPM package nodemailer
      nodemailer.createTestAccount(async (err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass  // generated ethereal password
            }
        });
      let info = await transporter.sendMail({
        from: '"CURATIO" <\'host@curatio.com\'>',
        to: "kay43540@gmail.com",
        subject: "Hello",
        text: "Hello world",
        html: "<b>Hello world?</b>",
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    res.status(200);
    res.redirect('/api/dashboard');
  } catch (err) {
    // res.status(400).json(err);
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  console.log("hi");
  // console.log(res);
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // res.json({ user: userData, message: 'You are now logged in!' });
    // });
    res.status(200);
    console.log("loginsuccess");
    res.redirect('/dashboard')
    return;

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  res.status(200);
  // res.redirect('/')
});

module.exports = router;
