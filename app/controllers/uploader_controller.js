
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
    path = require('path');


/**
 *
 * @param req
 * @param res
 */
exports.face = function(req,res){
    console.log('dddd');
}

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
    res.render('temp/file-test', {
        title: 'Say',
        user : req.session.user,
        currentLink: 'MICRO',
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};
