"user strict";

var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var app = express();
var fs = require('fs');

// set port
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(port, function () {
  console.log('Example app listening on port '+port);
});

//handle post
app.post('/get-file-data', upload.single('file'), function (req, res) {
  var filesize = {};
  filesize.size = (req.file.size);
  res.json(filesize);
  
  fs.unlink("uploads/"+req.file.filename, (err) => {
        if (err) {
            console.log("failed to delete local file:"+err);
        } else {
            //console.log('successfully deleted local file');                                
        }
  });

});

