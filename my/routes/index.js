var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: '登录页面' });
});

router.get('/goods', function(req, res, next) {
  res.render('goods', { title: '商品页面' });
});

module.exports = router;
