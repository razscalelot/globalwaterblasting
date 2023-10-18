var express = require('express');
var router = express.Router();
const offerModel = require('../../models/offers.model');
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const responseManager = require('../../utilities/response.manager');
let async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  let seo = {
    title: 'Our Work -Global Water Blasting NZ',
    description: 'Our Work at Global Water Blasting is to make your home exteriors glow like new. We use the best methods and eco-friendly products while washing homesy!',
    canonical: 'https://globalwaterblasting.co.nz/ourwork',
    ogtype: 'article',
    ogtitle: 'Our Work -Global Water Blasting NZ',
    ogurl: 'https://globalwaterblasting.co.nz/ourwork',
    ogimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    ogdescription: 'Our Work at Global Water Blasting is to make your home exteriors glow like new. We use the best methods and eco-friendly products while washing homes',
    articleauthor: 'globalwaterblasting.co.nz',
    articlemodified_time: '2022-08-11T16:21+12:00',
    articletag: 'Globalwaterblastinglogo',
    twittercard: 'summary',
    twittersite: '@https://globalwaterblasting.co.nz/ourwork',
    twittertitle: 'Our Work -Global Water Blasting NZ',
    twitterimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    twitterdescription: 'Our Work at Global Water Blasting is to make your home exteriors glow like new. We use the best methods and eco-friendly products while washing homesy',
    twitterimagealt: 'Globalwaterblastinglogo'
  }
  res.render('front/app/ourwork', { seo: seo, title: 'Our Work || Global Water Blasting', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI });
});

router.post('/', async (req, res) => {
  let { name, email, mobile, address, postcode, message } = req.body;
  if (name && name.trim() != '' && email && email.trim() != '' && mobile && mobile != '' && address && address.trim() != '' && postcode && postcode != '') {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let offerData = await primary.model(constants.MODELS.offers, offerModel).findOne({ $or: [{ mobile: mobile }, { email: email }] }).lean();
    if (offerData == null) {
      let obj = {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        postcode: postcode,
        message: message
      }
      let insertedData = await primary.model(constants.MODELS.offers, offerModel).create(obj)
      if (insertedData && insertedData != null) {
        req.flash('message', 'Your message has been successfully sent. We will contact you very soon!');
        res.redirect('/ourwork');
      } else {
        req.flash('message', 'Something went wrong, Please try again');
        res.redirect('/ourwork');
      }
    } else {
      req.flash('message', 'The request message was already sent. We will contact you very soon!');
      res.redirect('/ourwork');
    }
  } else {
    req.flash('message', 'Invalid name, email, mobile, address, postcode and message can not be empty, please try again');
    res.redirect('/ourwork');
  }
});

module.exports = router;
