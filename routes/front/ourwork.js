var express = require('express');
var router = express.Router();
const offerModel = require('../../models/offers.model');
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const responseManager = require('../../utilities/response.manager');
let async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/app/ourwork', { title: 'Our Work || Global Water Blasting' });
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
        res.render('front/app/ourwork', {
          title: 'Our Work || Global Water Blasting',
          message: 'Your message has been successfully sent. We will contact you very soon!',
          Data: 0,
          Status: 200,
          IsSuccess: true
        });
      } else {
        res.render('front/app/ourwork', {
          title: 'Our Work || Global Water Blasting',
          message: 'Something went wrong, Please try again',
          Data: 0,
          Status: 400,
          IsSuccess: false
        });
      }
    } else {
      res.render('front/app/ourwork', {
        title: 'Our Work || Global Water Blasting',
        message: 'The request message was already sent. Cannot send the same request message multiple times',
        Data: 0,
        Status: 400,
        IsSuccess: false
      });
    }
  } else {
    res.render('front/app/ourwork', {
      title: 'Our Work || Global Water Blasting',
      message: 'Invalid name, email, mobile, address, postcode and message can not be empty, please try again',
      Data: 0,
      Status: 400,
      IsSuccess: false
    });
  }
});

module.exports = router;
