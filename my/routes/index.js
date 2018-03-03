var express = require('express');
var router = express.Router();
var usermodel=require("../mondel/usermodel");
var goodsmodel = require("../mondel/goodsmodel");
var multiparty = require('multiparty');

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

router.get('/api/goods_del', function(req, res, next) {
 	goodsmodel.findByIdAndRemove({_id:req.query.gid},function(err){
 		var result={
			status:1,
			message:"删除成功"
		};
		if(err){
			result.status=-119;
			result.message="删除失败";
		}
		res.send(result);

 	})
});
router.get('/showgoods', function(req, res, next) {
	var page=parseInt(req.query.page||1);
	var count=parseInt(req.query.count||3);

	var query=goodsmodel.find({}).skip((page-1)*count).limit(count).sort({date:-1});
	query.exec(function(err,results){
		console.log(err);
		res.render("showgoods", {list: results,page:page,count:count,lists:results.length});
	})
 //  goodsmodel.find({}, function(err, docs) {
	// 	res.render("showgoods", {list: docs});
	// })
});

router.get('/addgoods', function(req, res, next) {
  res.render('addgoods', { title: '添加新商品' });
});


router.post("/addgoods", function(req, res){

	var Form = new multiparty.Form({
		uploadDir: "./public/images"
	})
	Form.parse(req, function(err, body, files){
		var goods_name = body.goods_name[0];
		var goods_num = body.goods_num[0];
		var price = body.price[0];
		var dream_num = body.dream_num[0];
		var imgName = files.img[0].path;
		imgName = imgName.substr(imgName.lastIndexOf("\\") + 1);

		var gm = new goodsmodel();
		gm.goods_name = goods_name;
		gm.goods_num = goods_num;
		gm.price = price;
		gm.dream_num = dream_num;
		gm.img = imgName;
		gm.save(function(err){
			if(!err) {
				res.send("商品保存成功");
			} else {
				res.send("商品保存失败");
			}
		})
	})
})

module.exports = router;
