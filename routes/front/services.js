var express = require('express');
var router = express.Router();
const services = require("../../services");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('front/app/services', { title: 'Services || Global Water Blasting', services: services });
});

module.exports = router;
