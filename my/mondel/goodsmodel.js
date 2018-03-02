var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var Goods = new Schema({
    goods_name:String,
    goods_num:String,
    price:String,
    dream_num:String,
    img:String,
    creat_date     : { type: Date, default: Date.now },
});

var goodsmodel = mongoose.model('goods', Goods);

module.exports=goodsmodel;