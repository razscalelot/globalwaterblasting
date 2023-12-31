var express = require('express');
var router = express.Router();
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const serviceModel = require('../../models/services.model');
const responseManager = require('../../utilities/response.manager');


/* GET home page. */
router.get('/', async (req, res) => {
    let seo = {
        title: 'Pressure Washing & Cleaning Services Global Water Blasting NZ',
        description: 'Global Water Blasting services: House washing, fence and driveway washing, roof washing and moss & mold treatment, gutter cleaning, and deck washing.',
        canonical: 'https://globalwaterblasting.co.nz/services',
        ogtype: 'article',
        ogtitle: 'Pressure Washing & Cleaning Services Global Water Blasting NZ',
        ogurl: 'https://globalwaterblasting.co.nz/services',
        ogimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
        ogdescription: 'Global Water Blasting services: House washing, fence and driveway washing, roof washing and moss & mold treatment, gutter cleaning, and deck washing.',
        articleauthor: 'Globalwaterblasting.co.nz',
        articlemodified_time: '2022-08-11T16:21+12:00',
        articletag: 'Globalwaterblastinglogo',
        twittercard: 'summary',
        twittersite: '@https://globalwaterblasting.co.nz/services',
        twittertitle: 'Pressure Washing & Cleaning Services Global Water Blasting NZ',
        twitterimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
        twitterdescription: 'Global Water Blasting services: House washing, fence and driveway washing, roof washing and moss & mold treatment, gutter cleaning, and deck washing.',
        twitterimagealt: 'Globalwaterblastinglogo'
    }
    res.render('front/app/services', { seo: seo, title: 'Services || Global Water Blasting', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'services' });
});

router.get('/list', async (req, res) => {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let services = await primary.model(constants.MODELS.services, serviceModel).find({}).lean();
    if (services && services != '') {
        return responseManager.onSuccess('Service List', services, res);
    } else {
        return responseManager.badrequest({ message: 'Service not found' }, res);
    }
});

module.exports = router;
