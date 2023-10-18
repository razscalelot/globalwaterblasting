var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let seo = {
    title: 'About Us -Global Water Blasting NZ',
    description: 'Global Water Blasting makes home exterior washing easy by employing the right methods. Our experienced staff is trained to refresh your house exteriors.!',
    canonical: 'https://globalwaterblasting.co.nz/aboutus',
    ogtype: 'article',
    ogtitle: 'About Us -Global Water Blasting NZ',
    ogurl: 'https://globalwaterblasting.co.nz/aboutus',
    ogimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    ogdescription: 'Global Water Blasting makes home exterior washing easy by employing the right methods. Our experienced staff is trained to refresh your house exteriors.',
    articleauthor: 'globalwaterblasting.co.nz',
    articlemodified_time: '2022-08-11T16:21+12:00',
    articletag: 'Globalwaterblastinglogo',
    twittercard: 'summary',
    twittersite: '@https://globalwaterblasting.co.nz/aboutus',
    twittertitle: 'About Us -Global Water Blasting NZ',
    twitterimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    twitterdescription: 'Global Water Blasting makes home exterior washing easy by employing the right methods. Our experienced staff is trained to refresh your house exteriors.',
    twitterimagealt: 'Globalwaterblastinglogo'
  }
  res.render('front/app/aboutus', { seo: seo, title: 'About Us - Global Water Blasting NZ', description: 'Global Water Blasting makes home exterior washing easy by employing the right methods. Our experienced staff is trained to refresh your house exteriors.', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI });
});

module.exports = router;
