var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
    username:String,
    psw:String,
    creat_date     : { type: Date, default: Date.now },
});

var usermodel = mongoose.model('user', User);

module.exports=usermodel;