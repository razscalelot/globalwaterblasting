var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/app/ourwork', { title: 'Our Work || Global Water Blasting' });
});

module.exports = router;
