const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdata', {useNewUrlParser: true});
var conn =mongoose.Collection;

var librarySchema =new mongoose.Schema({
    select:String,
    subject: String,
    topic:String,
    email: String,
    imagename:String


});

var libraryModel = mongoose.model('webdata', librarySchema);
module.exports=libraryModel;
