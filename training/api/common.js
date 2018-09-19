var http = require('http');
var url = require('url');
var fs = require('fs');
var uc = require('upper-case');
var formidable = require('formidable');
var mv = require('mv');

http.createServer(function (req, res) {
  console.info('Create Server');
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  console.info('URL: ', filename);

  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.info('Start upload!');
      var oldpath = files.filetoupload.path;
      console.info('Old path: ' + oldpath);
      var newpath = '../files/' + files.filetoupload.name;
      console.info('New path: ' + newpath);

      mv(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
        console.info('Upload successful!');
      });
    });
  } else {
    fs.readFile('../html/' + filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }  
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
}).listen(8080);