const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdata', {useNewUrlParser: true});
var conn =mongoose.Collection;

var paperSchema =new mongoose.Schema({
    subject: String,
    year:Number,
    docdow:String


});

var paperModel = mongoose.model('questionpaper', paperSchema);
module.exports=paperModel;
