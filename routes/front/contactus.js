var express = require('express');
const contactusModel = require('../../models/contactus.model');
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const responseManager = require('../../utilities/response.manager');
var router = express.Router();
let async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
  let seo = {
    title: 'Contact- Global Water Blasting',
    description: 'Contact Global water blasting: Mon - Thu: 9 am - 5 pm, Weekend: 10 am - 3 pm. Entire Auckland region | +64223514444 | globalwaterblasting@gmail.com.!',
    canonical: 'https://globalwaterblasting.co.nz/contactus',
    ogtype: 'article',
    ogtitle: 'Contact- Global Water Blasting',
    ogurl: 'https://globalwaterblasting.co.nz/contactus',
    ogimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    ogdescription: 'Contact Global water blasting: Mon - Thu: 9 am - 5 pm, Weekend: 10 am - 3 pm. Entire Auckland region | +64223514444 | globalwaterblasting@gmail.com',
    articleauthor: 'globalwaterblasting.co.nz',
    articlemodified_time: '2022-08-11T16:21+12:00',
    articletag: 'Globalwaterblastinglogo',
    twittercard: 'summary',
    twittersite: '@https://globalwaterblasting.co.nz/contactus',
    twittertitle: 'Contact- Global Water Blasting',
    twitterimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    twitterdescription: 'Contact Global water blasting: Mon - Thu: 9 am - 5 pm, Weekend: 10 am - 3 pm. Entire Auckland region | +64223514444 | globalwaterblasting@gmail.com',
    twitterimagealt: 'Globalwaterblastinglogo'
  }
  res.render('front/app/contactus', { seo: seo, title: 'Contact Us || Global Water Blasting', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI });
});

router.post('/', async (req, res) => {
  let { name, email, mobile, address, postcode, message } = req.body;
  if (name && name.trim() != '' && email && email.trim() != '' && mobile && mobile != '' && address && address.trim() != '' && postcode && postcode != '') {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let contactusData = await primary.model(constants.MODELS.contactus, contactusModel).findOne({ $or: [{ mobile: mobile }, { email: email }] }).lean();
    if (contactusData == null) {
      let obj = {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        postcode: postcode,
        message: message
      }
      let insertedData = await primary.model(constants.MODELS.contactus, contactusModel).create(obj)
      if (insertedData && insertedData != null) {
        req.flash('message', 'Your message has been successfully sent. We will contact you very soon!');
        res.redirect('/contactus');
      } else {
        req.flash('message', 'Something went wrong, Please try again');
        res.redirect('/contactus');
      }
    } else {
      req.flash('message', 'The request message was already sent. We will contact you very soon!');
      res.redirect('/contactus');
    }
  } else {
    req.flash('message', 'Invalid name, email, mobile, address, postcode and message can not be empty, please try again');
    res.redirect('/contactus');
  }
});

module.exports = router;
