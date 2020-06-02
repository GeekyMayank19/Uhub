const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdata', {useNewUrlParser: true});
var conn =mongoose.Collection;

var ebookSchema =new mongoose.Schema({
    subject: String,
    bookname:String,
    ebookname:String
});

var ebookModel = mongoose.model('ebook', ebookSchema);
module.exports=ebookModel;