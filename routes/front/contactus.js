var express = require('express');
const contactusModel = require('../../models/contactus.model');
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const responseManager = require('../../utilities/response.manager');
var router = express.Router();
let async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {  
  res.render('front/app/contactus', { title: 'Contact Us || Global Water Blasting' });
});

router.post('/', async (req, res) => {
  console.log("req", req.body);
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
      console.log("obj",obj);
      let insertedData = await primary.model(constants.MODELS.contactus, contactusModel).create(obj)
      if (insertedData && insertedData != null) {
        res.render('front/app/contactus', {
          title: 'Contact Us || Global Water Blasting',
          message: 'Your message has been successfully sent. We will contact you very soon!',
          Data: 0,
          Status: 200,
          IsSuccess: true
        });
      } else {
        res.render('front/app/contactus', {
          title: 'Contact Us || Global Water Blasting',
          message: 'Something went wrong, Please try again',
          Data: 0,
          Status: 400,
          IsSuccess: false
        });
      }
    } else {
      res.render('front/app/contactus', {
        title: 'Contact Us || Global Water Blasting',
        message: 'The request message was already sent. We will contact you very soon!',
        Data: 0,
        Status: 400,
        IsSuccess: false
      });
    }
  } else {
    res.render('front/app/contactus', {
      title: 'Contact Us || Global Water Blasting',
      message: 'Invalid name, email, mobile, address, postcode and message can not be empty, please try again',
      Data: 0,
      Status: 400,
      IsSuccess: false
    });
  }
});

module.exports = router;
