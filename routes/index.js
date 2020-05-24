var express = require('express');
var multer = require('multer');
var libModel = require('../modules/library');
var paperModel = require('../modules/mqpaper');

var router = express.Router();

var paperlibrary=paperModel.find({});
var path = require('path');


router.use(express.static(__dirname+"./public/"));


// var Storage= multer.diskStorage({
//   destination:"./public/uploads/",
//   filename:(req,file,cb)=>{
//     cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//   }
// });
/// storage 1
var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    var originalname = file.originalname;
    var extension = originalname.split(".");
    filename = (null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    cb(null, filename);
    console.log(extension)
    console.log(originalname)
    
  }
});

var upload = multer({
  storage:Storage
}).single('file');









router.get('/', function(req, res, next) {
 
    res.render('index', { title: 'Files to download' });
});


router.get('/upload', function(req, res, next) {
 
  res.render('upload', { title: 'Files to download'});

});


router.post('/upload',upload, function(req, res, next) {
  var imageFile=req.file.filename;
  var success =req.file.filename+ " uploaded successfully";

  var fileDetails = new libModel({
    select:req.body.select,
    subject: req.body.usubject,
    topic:req.body.utopic,
    email: req.body.uemail,   
    imagename: imageFile
  });

  if(imageFile==''){
    res.sends("please select the file ")
  }
  fileDetails.save();

    res.render('upload',{success});
    
});


router.get('/search/', function(req, res, next) {
 
  res.render('search', { title: 'Files to download'});

});


router.post('/search', function(req, res, next) {
  
  var filrSubject = req.body.fltrsub;


  var libraryfilter =libModel.find({"subject" : filrSubject});

  libraryfilter.exec(function(err,data){
    if(err) throw err;
    res.render('search', { records:data });

  });
 
});
 /// model question paper
 router.get('/mqp', function(req, res, next) {
  res.render('mqp');
});

module.exports = router;












