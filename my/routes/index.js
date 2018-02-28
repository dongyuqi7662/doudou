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

router.get('/showgoods', function(req, res, next) {
  res.render('showgoods', { title: '商品列表' });
});

router.get('/addgoods', function(req, res, next) {
  res.render('addgoods', { title: '添加新商品' });
});

module.exports = router;
