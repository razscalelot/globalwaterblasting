var express = require('express');
var router = express.Router();
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const serviceModel = require('../../models/services.model');
const responseManager = require('../../utilities/response.manager');


/* GET home page. */
router.get('/', async (req, res) => {
    res.render('front/app/services', { title: 'Services || Global Water Blasting', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI });
});

router.get('/list', async (req, res) => {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let services = await primary.model(constants.MODELS.services, serviceModel).find({}).lean();
    if (services && services != ''){
        return responseManager.onSuccess('Service List', services, res);
    }else{
        return responseManager.badrequest({message: 'Service not found'}, res);
    }
});

module.exports = router;
