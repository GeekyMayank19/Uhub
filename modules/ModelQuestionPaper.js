const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdata', {useNewUrlParser: true});
var conn =mongoose.Collection;

var paperSchema =new mongoose.Schema({
    select:String,
    subject: String,
    topic:String,
    email: String,
    imagename:String


});

var paperModel = mongoose.model('Model Question Paper', paperSchema);
module.exports=paperModel;
