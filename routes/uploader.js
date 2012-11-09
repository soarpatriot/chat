
/*
 * User controller
 */

//var CLOUDINARY_URL='cloudinary://463734787194182:VPScMiTP4h2wy6C232xExi6rXXk@hdg4eyw5m';
//CLOUDINARY_URL=cloudinary://711655996988916:cQR1ZXGWEgi7bOvLpy3UAekZRuU@soar
//85624529@qq.com 22143521  cloudinary
var express = require('express'),
    fs = require('fs'),
    util = require('util'),
    //uuid = require('node-uuid'),
    path = require('path'),
    cloudinary = require('cloudinary');
    //cloudinary.CLOUDINARY_URL= 'cloudinary://463734787194182:VPScMiTP4h2wy6C232xExi6rXXk@hdg4eyw5m';
    cloudinary.config({
        api_key:'711655996988916',
            api_secret:'cQR1ZXGWEgi7bOvLpy3UAekZRuU',
        cloud_name:'soar'
    })




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





exports.uploadFace = function(req, res){

    var target_path =  __dirname + '/../public/images/face/';
    //path.basename(tmp_path) + extName;

    var fname = req.header('x-file-name');
    /**
    var fname = req.files.qqfile.name;
    console.log("ss");
    cloudinary.uploader.upload(fname,function(result) {
        console.log("result:  "+result);

        res.send(result);


    });**/
   // var filePath = req.body.file;
    //'/home/soar/Firefox_wallpaper.png'
   // console.log('path:'+filePath);

    var tmpPath = '/tmp/';
    //console.log('req filename::  '+tmpPath);

    /**
    stream = cloudinary.uploader.upload_stream(function(result) {
        console.log(result);


        res.send('Done:<br/> <img src="' + result.url + '"/><br/>' +
            cloudinary.image(result.public_id, { format: "png", width: 100, height: 130, crop: "fill" }));
        res.send(result);
    }, { public_id: req.body.title } );**/


    //fs.createReadStream(tmpPath, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);

    //var os = fs.createWriteStream(dest);
    //var is = fs.createReadStream(source)
    //is.pipe(os);

    saveTmpFile(req, target_path, function(data) {
        console.log(data);
        //if(){
            data.success = true;
            res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 200);
        //}else{
          //  res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 404);
        //}

    });



    /**
    var fileExtention = req.headers['x-file-name'];
    05.var fileStream = fs.createWriteStream(filePath);
    06.req.pipe(fileStream);
    07.req.on('end', function() {
        08.//接收数据完毕，需要给客户端返回值，否则，客户端将一直等待，直到失败（其实上传文件已经成功了）
        09.res.send({success:true});
        10.})

     **/
}

var saveTmpFile = function(req, targetdir, callback){
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

    // Old form-based upload
    else {
        moveToDestination(req.files.qqfile.path, targetdir+req.files.qqfile.name);
    }
}

var moveToCloud = function(source,callback){
    //var is = fs.createReadStream(source)


    stream = cloudinary.uploader.upload_stream(callback);

    /**
    req.on('data', function(data) {
        stream.write(data);
    });
    req.on('end', function() {
        stream.end();
    });**/
    fs.createReadStream(source, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);

    /*
    is.on('error', function(err) {
        console.log('moveFile() - Could not open readstream.');
        callback('Sorry, could not open readstream.')
    });
    is.on('end', function() {
        //fs.unlinkSync(source);
        //callback();
        stream.end
    });


    //var os = fs.createWriteStream(dest);
    stream.on('error', function(err) {
        console.log('moveFile() - Could not open writestream.');
        callback('Sorry, could not open writestream.');
    });

    is.pipe(stream);
    */
    /*
    var os = fs.createWriteStream(dest);
    os.on('error', function(err) {
        console.log('moveFile() - Could not open writestream.');
        callback('Sorry, could not open writestream.');
    });

    is.pipe(os);*/
}

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