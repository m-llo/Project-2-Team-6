const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground" // Redirect URL
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });
    const accessToken = oauth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
        tls: {
          rejectUnauthorized: false
        }
      }
    });

    let mailOptions = {
      from: '"CURATIO" <\'host@curatio.com\'>',
      to: userData.email,
      subject: "Nodemailer Project",
      text: "Hi from your nodemailer project"
    };
    transporter.sendMail(mailOptions, function (err, response) {
      if (err) {
        console.log("Error sending email:" + err);
      } else {
        console.log(response);
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
