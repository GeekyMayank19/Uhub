var express = require('express');
var multer = require('multer');
var libModel = require('../modules/library');
var paperModel = require('../modules/mqpaper');
var ebookModel = require('../modules/ebook')

var router = express.Router();
var path = require('path');
var ebookdata =ebookModel.find({});
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
  filename: function (req,res, file, cb) {
    var originalname = file.originalname;
    var ext = path.extname(originalname);
    filename = (null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    cb(null, filename);
    console.log(originalname);
    if (ext !== '.png' && ext !== 'pdf' && ext !== '.gif' && ext !== '.jpeg') {
				return res.render("please choose valide formate file");
			}
  }
});

var upload = multer({
  storage:Storage
}).single('file');

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


//storage 2
var Storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/qustionpaper/');
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

var upload2 = multer({
  storage:Storage2
}).single('file');

router.get('/mqpupload', function(req, res, next) {
 
  res.render('mqpupload');

});


router.post('/mqpupload',upload2, function(req, res, next) {
  var imageFile=req.file.filename;

  var fileDetails = new paperModel({
    subject: req.body.usubject,
    year:req.body.uyear,   
    docdow: imageFile
  });

  if(imageFile==''){
    res.sends("please select the file ")
  }
  fileDetails.save();

    res.render('mqpupload');
    
});


////////////storage 2//////////////////////


/////////////storage 3 for ebooks/////////


var Storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/ebooks/');
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

var upload3 = multer({
  storage:Storage3
}).single('file');

router.get('/ebookupload', function(req, res, next) {
 
  res.render('ebookupload');

});


router.post('/ebookupload',upload3, function(req, res, next) {
  var imageFile=req.file.filename;

  var fileDetails = new ebookModel({
    subject: req.body.usubject,  
    bookname:req.body.ubookname,
    ebookname: imageFile
  });

  if(imageFile==''){
    res.sends("please select the file ")
  }
  fileDetails.save();

    res.render('ebookupload');
    
});

/////////////storage 3 for ebooks/////////






router.get('/', function(req, res, next) {
 
    res.render('index', { title: 'Files to download' });
});


router.get('/upload', function(req, res, next) {
 
  res.render('upload', { title: 'Files to download'});

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


router.get('/mqpsearch', function(req, res, next) {
  res.render('mqpsearch');
});
router.post('/mqpsearch', function(req, res, next) {
  var filrSubject = req.body.fltrsub;


  var libraryfilter =paperModel.find({"subject" : filrSubject});

  libraryfilter.exec(function(err,data){
    if(err) throw err;
    res.render('mqpsearch', { records:data });

  });
 
});

 /////////////ebooks//////////////////

// router.get('/ebooks', function(req, res, next) {
  
//   res.render('ebooks');
// });


router.get('/ebooksearch', function(req, res, next) {
  ebookdata.exec(function(err,data){
    if(err) throw err;
    res.render('ebooksearch', { records:data });

  });

});


router.post('/ebooksearch', function(req, res, next) {
  var filrSubject = req.body.fltrsub;


  var libraryfilter =ebookModel.find({"subject" : filrSubject});

  libraryfilter.exec(function(err,data){
    if(err) throw err;
    res.render('ebooksearch', { records:data });

  });
 
});

////////////////////////////////


module.exports = router;












