
/*
 * User controller
 */

//var CLOUDINARY_URL='cloudinary://463734787194182:VPScMiTP4h2wy6C232xExi6rXXk@hdg4eyw5m';
//CLOUDINARY_URL=cloudinary://711655996988916:cQR1ZXGWEgi7bOvLpy3UAekZRuU@soar
//85624529@qq.com 22143521  cloudinary
var express = require('express'),
    fs = require('fs'),
    util = require('util'),
    uuid = require('node-uuid'),
    path = require('path'),
    cloudinary = require('../models/cloudinary.js');





exports.saveProfile = function(req, res){
    // 获得文件的临时路径
    var tmp_path = req.files.face.path;
    var extName = path.extname(req.files.face.name);
    // 指定文件上传后的目录 - 示例为"images"目录。
    // + req.files.face.name;
    var target_path =  __dirname + '/../public/images/face/'+path.basename(tmp_path) + extName;



    fs.readFile(tmp_path, function (err, data) {
        if (err) {
            res.send(err);
            return;
        }
        console.log('1213');
        fs.writeFile(target_path, data, function (err) {
            if (!err) {
                res.send({uploaded: true});
            } else {
                res.send(err);
            }
        });
    });
};


/**
 * uploader ajax
 * @param req
 * @param res
 */
exports.uploadFace = function(req, res){

    var target_path =  __dirname + '/../public/images/face/';
    var fname = req.header('x-file-name');
    var tmpPath = '/tmp/';

    saveTmpFile(req, function(data) {

        if(!data.success){

            data.success = true;
            console.log('success:  '+ data);
            res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 200);
        }else{
            res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 404);
        };

    });

}

var saveTmpFile = function(req, callback){
    if(req.xhr) {
        //var fname = req.header('x-file-name');

        // Be sure you can write to '/tmp/'
        var tmpfile = '../tmp'+uuid.v1();


        var ws = fs.createWriteStream(tmpfile);
        ws.on('error', function(err) {
            console.log("uploadFile() - req.xhr - could not open writestream.");
            callback({success: false, error: "Sorry, could not open writestream."});
        });
        ws.on('close', function(err) {
            moveToCloud(tmpfile,callback);
        });

        // Writing filedata into writestream
        req.on('data', function(data) {
            ws.write(data);
        });
        req.on('end', function() {
            ws.end();
        });
    }


};

var moveToCloud = function(source,callback){
    //var is = fs.createReadStream(source)


    stream = cloudinary.uploader.upload_stream(callback);

    fs.createReadStream(source, {encoding: 'binary'})
        .on('data', stream.write)
        .on('end' ,stream.end);



};

exports.filePicker = function(req,res){
    res.render('file-test', {
        title: 'Say',
        user : req.session.user,
        currentLink: 'MICRO',
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};

/**
// Mainfunction to recieve and process the file upload data asynchronously
var uploadFile = function(req, targetdir, callback) {

    // Moves the uploaded file from temp directory to it's destination
    // and calls the callback with the JSON-data that could be returned.
    var moveToDestination = function(sourcefile, targetfile) {
        moveFile(sourcefile, targetfile, function(err) {
            if(!err)
                callback({success: true});
            else
                callback({success: false, error: err});
        });
    };

    // Direct async xhr stream data upload, yeah baby.
    if(req.xhr) {
        var fname = req.header('x-file-name');

        // Be sure you can write to '/tmp/'
        var tmpfile = '/tmp/'+'1';   //uuid.v1();

        // Open a temporary writestream
        var ws = fs.createWriteStream(tmpfile);
        ws.on('error', function(err) {
            console.log("uploadFile() - req.xhr - could not open writestream.");
            callback({success: false, error: "Sorry, could not open writestream."});
        });
        ws.on('close', function(err) {
            moveToDestination(tmpfile, targetdir+fname);
        });

        // Writing filedata into writestream
        req.on('data', function(data) {
            ws.write(data);
        });
        req.on('end', function() {
            ws.end();
        });
    }

    // Old form-based upload
    else {
        moveToDestination(req.files.qqfile.path, targetdir+req.files.qqfile.name);
    }
};

// Moves a file asynchronously over partition borders
var moveFile = function(source, dest, callback) {
    var is = fs.createReadStream(source)

    is.on('error', function(err) {
        console.log('moveFile() - Could not open readstream.');
        callback('Sorry, could not open readstream.')
    });
    is.on('end', function() {
        fs.unlinkSync(source);
        callback();
    });

    var os = fs.createWriteStream(dest);
    os.on('error', function(err) {
        console.log('moveFile() - Could not open writestream.');
        callback('Sorry, could not open writestream.');
    });

    is.pipe(os);
};


};**/