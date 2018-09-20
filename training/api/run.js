var http = require('http');
var url = require('url');
var fs = require('fs');
var uc = require('upper-case');
var formidable = require('formidable');
var mv = require('mv');
var nodemailer = require('nodemailer');
var utils = require('./utils.js');
var mysql = require('mysql');

http.createServer(function(req, res) {
    console.info('Create Server: ' + req.url);
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;

    switch (req.url) {
        case '/mySQL':
            //utils.redirect(res, 'upload.html');
            var con = utils.createConnection(mysql);
            con.connect((err) => {
                if(err){
                    console.log('[ERROR] Error connecting to DB');
                    return;
                }
                console.log('Connection established');
                con.query("SELECT * FROM `nodejs-training`.user WHERE isActive = ?", [1], function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                });
                console.info('[INFO] Close Connection!');
                con.end();
            });
            res.end();
            break;
        case '/sendMail':
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                console.info('To: ' + fields.toEmail);
                console.info('Subject: ' + fields.subject);
                console.info('Content: ' + fields.content);
                var isSuccess = utils.sendMail(utils.transporter(nodemailer), utils.mailOptions(fields.toEmail, fields.subject, fields.content));
                if (isSuccess) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write('Send mail successful!');
                    res.end();
                    console.info('Send mail successful!');
                } else {
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    return res.end("Send mail failled!");
                }
            });
            break;
        case '/fileupload':
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                console.info('Start upload!');
                var oldpath = files.filetoupload.path;
                console.info('Old path: ' + oldpath);
                var newpath = '../files/' + files.filetoupload.name;
                console.info('New path: ' + newpath);

                mv(oldpath, newpath, function(err) {
                    if (err) throw err;
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write('File uploaded and moved!');
                    res.end();
                    console.info('Upload successful!');
                });
            });
            break;
        default:
            fs.readFile('../html/' + filename, function(err, data) {

                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    return res.end("404 Not Found");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    return res.end();
                }
            });
    }
}).listen(8080);