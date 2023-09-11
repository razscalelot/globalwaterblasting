var express = require('express');
var router = express.Router();
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const quoteModel = require("../../models/quotes.model");
const services = require("../../services");
let async = require('async');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let serviceData = {};
  async.forEachSeries(services, (service, next_service) => {
    if (req.query.name == service.serviceslug) {
      serviceData = service;
    }
    next_service();
  });
  if (req.query.status == 'true') {
    res.render('front/app/servicedetails', {
      title: 'Service Details || Global Water Blasting',
      message: 'Your message has been successfully sent. We will contact you very soon!',
      Data: 0,
      serviceData: serviceData,
      Status: 200,
      IsSuccess: true
    });
  } else if (req.query.status == 'false') {
    res.render('front/app/servicedetails', {
      title: 'Service Details || Global Water Blasting',
      message: 'Something went wrong, Please try again',
      Data: 0,
      serviceData: serviceData,
      Status: 400,
      IsSuccess: false
    });
  } else if (req.query.status == 'existing') {
    res.render('front/app/servicedetails', {
      title: 'Service Details || Global Water Blasting',
      message: 'The request message was already sent. We will contact you very soon!',
      Data: 0,
      serviceData: serviceData,
      Status: 400,
      IsSuccess: false
    });
  }
  else if (req.query.status == 'blank') {
    res.render('front/app/servicedetails', {
      title: 'Service Details || Global Water Blasting',
      message: 'Invalid name, email, mobile, address, select service and message can not be empty, please try again',
      Data: 0,
      serviceData: serviceData,
      Status: 400,
      IsSuccess: false
    });
  }
  else {
    res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData });
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
        res.redirect('/servicedetails?name=' + redirect + '&status=true');
      } else {
        res.redirect('/servicedetails?name=' + redirect + '&status=false');
      }
    } else {
      res.redirect('/servicedetails?name=' + redirect + '&status=existing');
    }
  } else {
    res.redirect('/servicedetails?name=' + redirect + '&status=blank');
  }
});

module.exports = router;
