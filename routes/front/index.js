var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let seo = {
    title: 'Global Water Blasting | Exterior house wash in Auckland, NZ',
    description: 'Exterior house wash in the Auckland region. House washing, gutter cleaning, roof treatment, driveway wash, and fence washing | Global Water Blasting.',
    canonical: 'https://globalwaterblasting.co.nz/',
    ogtype: 'website',
    ogtitle: 'Global Water Blasting | Exterior house wash in Auckland, NZ',
    ogurl: 'https://globalwaterblasting.co.nz/#',
    ogimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    ogdescription: 'Exterior house wash in the Auckland region. House washing, gutter cleaning, roof treatment, driveway wash, and fence washing | Global Water Blasting',
    articleauthor: 'globalwaterblasting.co.nz',
    articlemodified_time: '2022-08-11T16:21+12:00',
    articletag: 'Globalwaterblastinglogo',
    twittercard: 'summary',
    twittertitle: 'Global Water Blasting | Exterior house wash in Auckland, NZ',
    twittersite: '@https://globalwaterblasting.co.nz/#',
    twitterdescription: 'Exterior house wash in the Auckland region. House washing, gutter cleaning, roof treatment, driveway wash, and fence washing | Global Water Blasting',
    twitterimage: 'https://globalwaterblasting.co.nz/assets/images/logo.png',
    twitterimagealt: 'Logo'
  }
  res.render('front/index', { seo: seo, title: 'Home || Global Water Blasting', message: req.flash('message'), AWS_BUCKET_URI: process.env.AWS_BUCKET_URI });
});

module.exports = router;
