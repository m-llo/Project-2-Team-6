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
    //nodemailer.createTestAccount(async (err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: 'smtp.ethereal.email',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
          type: '0Auth2',
          user: process.env.MAIL_USERNAME, //dotenv
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });
      //let info = transporter.sendMail({ //removed await from this line
      let mailOptions = {
        from: '"CURATIO" <\'host@curatio.com\'>',
        to: "kay43540@gmail.com",
        subject: "Nodemailer Project",
        text: "Hi from your nodemailer project"
      };
      //});
      //console.log("Message sent: %s", info.messageId);
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //});
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(200);
    res.redirect('/');
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post('/login', async (req, res) => {


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

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
    // res.status(200);
    // console.log("loginsuccess");
    // res.redirect('/dashboard')
    // return;

  } catch (err) {
    return res.status(400).json(err);

  }
});

router.post('/logout', (req, res) => {
  console.log('hitting logout post route');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  res.status(200);
});

module.exports = router;
