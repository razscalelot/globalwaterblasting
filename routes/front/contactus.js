var express = require('express');
const contactusModel = require('../../models/contactus.model');
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const responseManager = require('../../utilities/response.manager');
var router = express.Router();
let async = require('async');
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

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
  res.render('front/app/contactus', { seo: seo, title: 'Contact Us || Global Water Blasting', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page : 'contactus' });
});

router.post('/', async (req, res) => {
  let { name, email, mobile, address, postcode, message } = req.body;
  if (name && name.trim() != '' && mobile && mobile != '') {
    if ((/^(\+?\d{1,3})?([0-9]{3})([0-9]{3})([0-9]{4})$/.test(mobile))) {
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
            subject: 'Contact Query',
            htmlContent: `<h2>Customer Information</h2><h3> Customer Email: ` + email + `</h3><h3>Customer Mobile No.: ` + mobile + `</h3><h3>Customer Address: ` + address + ` ` + postcode + `</h3><h3>Customer Message: ` + message + `</h3>`,
          }).then((response) => {
            req.flash('message', 'Your message has been successfully sent. We will contact you very soon!');
            res.redirect('/contactus');
          }).catch((error) => {
            req.flash('message', error.message);
            res.redirect('/contactus');
          });
        } else {
          req.flash('message', 'Something went wrong, Please try again');
          res.redirect('/contactus');
        }
      } else {
        req.flash('message', 'The request message was already sent. We will contact you very soon!');
        res.redirect('/contactus');
      }
    } else {
      req.flash('message', 'Invalid phone number, please try again');
      res.redirect('/contactus');
    }
  } else {
    req.flash('message', 'Invalid name and phone number can not be empty, please try again');
    res.redirect('/contactus');
  }
});

module.exports = router;
