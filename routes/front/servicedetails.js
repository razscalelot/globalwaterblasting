var express = require('express');
var router = express.Router();
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const quoteModel = require("../../models/quotes.model");
const serviceModel = require("../../models/services.model");
let async = require('async');
var router = express.Router();
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

/* GET home page. */
router.get('/', async (req, res) => {
  let primary = mongoConnection.useDb(constants.DEFAULT_DB);
  let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({ serviceslug: req.query.name }).lean();
  let serviceName = await primary.model(constants.MODELS.services, serviceModel).find({}).select('servicename').lean();
  if (serviceData && serviceData != null) {
    let seo = {
      title: serviceData.servicename + ' - Global Water Blasting NZ',
      description: serviceData.shortdesc,
      canonical: 'https://globalwaterblasting.co.nz/',
      ogtype: 'website',
      ogtitle: serviceData.servicename + ' - Global Water Blasting NZ',
      ogurl: 'https://globalwaterblasting.co.nz/#',
      ogimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
      ogdescription: serviceData.shortdesc,
      articleauthor: 'globalwaterblasting.co.nz',
      articlemodified_time: '2022-08-11T16:21+12:00',
      articletag: 'Globalwaterblastinglogo',
      twittercard: 'summary',
      twittertitle: serviceData.servicename + ' - Global Water Blasting NZ',
      twittersite: '@https://globalwaterblasting.co.nz/#',
      twitterdescription: serviceData.shortdesc,
      twitterimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
      twitterimagealt: 'Globalwaterblastinglogo'
    }
    res.render('front/app/servicedetails', { seo: seo, title: 'Service Details || Global Water Blasting', serviceName: serviceName, serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page : 'servicedetails' });
  } else {
    res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page : 'servicedetails' });
  }
});

router.post('/', async (req, res) => {
  let { name, email, mobile, address, selected_service, massage, redirect } = req.body;
  if (name && name.trim() != '' && mobile && mobile != '' && selected_service && selected_service != '') {
    if ((/^(\+?\d{1,3})?([0-9]{3})([0-9]{3})([0-9]{4})$/.test(mobile))) {
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
          const tranEmailApi = new Sib.TransactionalEmailsApi()
          email = (email) ? email : 'example@gmail.com'
          const sender = {
            email: email,
            name: name
          }
          const receivers = [
            {
              email: process.env.SIB_EMAIL_ID,
              name: 'Global Water Blasting'
            },
          ];
          tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Service Enquiry: ' + selected_service,
            htmlContent: `<h2>Customer Information</h2><h3> Customer Email: ` + email + `</h3><h3>Customer Mobile No.: ` + mobile + `</h3><h3>Customer Address: ` + address + `</h3><h3>Interested Service: ` + selected_service + `</h3><h3>Customer Message: ` + massage + `</h3>`,
          }).then((response) => {
            req.flash('message', 'Your message has been successfully sent. We will contact you very soon!');
            res.redirect('/servicedetails?name=' + redirect);
         + }).catch((error) => {
            req.flash('message', error);
            res.redirect('/servicedetails?name=' + redirect);
          });
        } else {
          req.flash('message', 'Something went wrong, Please try again');
          res.redirect('/servicedetails?name=' + redirect);
        }
      } else {
        req.flash('message', 'The request message was already sent. We will contact you very soon!');
        res.redirect('/servicedetails?name=' + redirect);
      }
    } else {
      req.flash('message', 'Invalid phone number, please try again');
      res.redirect('/contactus');
    }
  } else {
    req.flash('message', 'Invalid name and phone number can not be empty, please try again');
    res.redirect('/servicedetails?name=' + redirect);
  }
});

module.exports = router;
