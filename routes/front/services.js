var express = require('express');
var router = express.Router();
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const serviceModel = require('../../models/services.model');
const responseManager = require('../../utilities/response.manager');
const mongoConnection = require('../../utilities/connections');
const constants = require('../../utilities/constants');
const quoteModel = require("../../models/quotes.model");

/* GET home page. */
router.get('/', async (req, res) => {
    let seo = {
        title: 'Pressure Washing & Cleaning Services Auckland Region NZ',
        description: 'Global Water Blasting services: House washing, fence and driveway washing, roof washing and moss & mold treatment, gutter cleaning, and deck washing.',
        canonical: 'https://globalwaterblasting.co.nz/services',
        ogtype: 'article',
        ogtitle: 'Pressure Washing & Cleaning Services Auckland Region NZ',
        ogurl: 'https://globalwaterblasting.co.nz/services',
        ogimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
        ogdescription: 'Global Water Blasting services: House washing, fence and driveway washing, roof washing and moss & mold treatment, gutter cleaning, and deck washing.',
        articleauthor: 'Globalwaterblasting.co.nz',
        articlemodified_time: '2022-08-11T16:21+12:00',
        articletag: 'Globalwaterblastinglogo',
        twittercard: 'summary',
        twittersite: '@https://globalwaterblasting.co.nz/services',
        twittertitle: 'Pressure Washing & Cleaning Services Auckland Region NZ',
        twitterimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
        twitterdescription: 'Global Water Blasting services: House washing, fence and driveway washing, roof washing and moss & mold treatment, gutter cleaning, and deck washing.',
        twitterimagealt: 'Globalwaterblastinglogo'
    }
    res.render('front/app/services', { seo: seo, title: 'Services || Global Water Blasting', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'services' });
});

router.get('/housewashing', async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({ serviceslug: "house-washing" }).lean();
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
        res.render('front/app/servicedetails', { seo: seo, title: 'Service Details || Global Water Blasting', serviceName: serviceName, serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'housewashing' });
    } else {
        res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'housewashing' });
    }
});
router.get('/fencepatiocleaning', async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({ serviceslug: "fence-patio-cleaning" }).lean();
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
        res.render('front/app/servicedetails', { seo: seo, title: 'Service Details || Global Water Blasting', serviceName: serviceName, serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'fencepatiocleaning' });
    } else {
        res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'fencepatiocleaning' });
    }
});
router.get('/drivewaysidewalkwash', async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({ serviceslug: "driveway-sidewalk-wash" }).lean();
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
        res.render('front/app/servicedetails', { seo: seo, title: 'Service Details || Global Water Blasting', serviceName: serviceName, serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'drivewaysidewalkwash' });
    } else {
        res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'drivewaysidewalkwash' });
    }
});
router.get('/roofmossmouldtreatment', async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({ serviceslug: "roof-moss-mould-treatment" }).lean();
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
        res.render('front/app/servicedetails', { seo: seo, title: 'Service Details || Global Water Blasting', serviceName: serviceName, serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'roofmossmouldtreatment' });
    } else {
        res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'roofmossmouldtreatment' });
    }
});
router.get('/guttercleaning', async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({ serviceslug: "gutter-cleaning" }).lean();
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
        res.render('front/app/servicedetails', { seo: seo, title: 'Service Details || Global Water Blasting', serviceName: serviceName, serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'guttercleaning' });
    } else {
        res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'guttercleaning' });
    }
});
router.get('/deckwash', async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let serviceData = await primary.model(constants.MODELS.services, serviceModel).findOne({ serviceslug: "deck-wash" }).lean();
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
        res.render('front/app/servicedetails', { seo: seo, title: 'Service Details || Global Water Blasting', serviceName: serviceName, serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'deckwash' });
    } else {
        res.render('front/app/servicedetails', { title: 'Service Details || Global Water Blasting', serviceData: serviceData, message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI, page: 'deckwash' });
    }
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
