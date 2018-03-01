var express = require('express');
var router = express.Router();
var usermodel=require("../mondel/usermodel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: '登录页面' });
});

router.post('/api/register',function(req,res){
	var username=req.body.username;
	var psw= req.body.psw; 

	var result={
		status:1,
		message:"登录成功"
	}

	usermodel.find({"username":username,"psw":psw},function(err,docs){
		if(!err && docs.length > 0) {
			console.log("登录成功");
			res.send(result);
		} else {
			console.log("登录失败，请检查您的用户名或者密码");
			result.status = -109;
			result.message = "登录失败，请检查您的用户名或者密码"
			res.send(result);
		}
	})
})

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
