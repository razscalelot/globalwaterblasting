var express = require('express');
var router = express.Router();
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const quoteModel = require("../../models/quotes.model");
const serviceModel = require("../../models/services.model");
let async = require('async');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  let primary = mongoConnection.useDb(constants.DEFAULT_DB);
  let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({serviceslug: req.query.name}).lean();
  if (serviceData && serviceData != null) {
    res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message') });
  } else {
    res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message') });
  }
});

router.post('/', async (req, res) => {
  let { name, email, mobile, address, selected_service, massage, redirect } = req.body;
  if (name && name.trim() != '' && email && email.trim() != '' && mobile && mobile != '' && address && address.trim() != '' && selected_service && selected_service != '') {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let contactusData = await primary.model(constants.MODELS.quotes, quoteModel).findOne({ $or: [{ mobile: mobile }, { email: email }] }).lean();
    if (contactusData == null) {
      let obj = {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        selected_service: selected_service,
        massage: massage
      }
      let insertedData = await primary.model(constants.MODELS.quotes, quoteModel).create(obj)
      if (insertedData && insertedData != null) {
        req.flash('message', 'Your message has been successfully sent. We will contact you very soon!');
        res.redirect('/servicedetails?name=' + redirect);
      } else {
        req.flash('message', 'Something went wrong, Please try again');
        res.redirect('/servicedetails?name=' + redirect);
      }
    } else {
      req.flash('message', 'The request message was already sent. We will contact you very soon!');
      res.redirect('/servicedetails?name=' + redirect);
    }
  } else {
    req.flash('message', 'Invalid name, email, mobile, address, select service and message can not be empty, please try again');
    res.redirect('/servicedetails?name=' + redirect);
  }
});

module.exports = router;
