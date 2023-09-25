var express = require('express');
var router = express.Router();
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const serviceModel = require('../../models/services.model');


/* GET home page. */
router.get('/', async (req, res) => {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let services = await primary.model(constants.MODELS.services, serviceModel).find({}).lean();
    res.render('front/app/services', { title: 'Services || Global Water Blasting', services: services, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI });
});

module.exports = router;
