/**
 * based on the cloudinary
 * clound photo store and operation
 * @type {*}
 */


//cloudinary = require('cloudinary');
//cloudinary.CLOUDINARY_URL= 'cloudinary://463734787194182:VPScMiTP4h2wy6C232xExi6rXXk@hdg4eyw5m';
//w_115,h_135,c_thumb,g_faces,r_20
var _ = require('underscore');

cloudinary.config({
    api_key:'711655996988916',
    api_secret:'cQR1ZXGWEgi7bOvLpy3UAekZRuU',
    cloud_name:'soar'
})


cloudinary.genDefaultFaceUrl = function(){
    var width = 'w_150';
    var height = 'h_150';
    var type = 'c_thumb';
    var faces = 'g_faces';
    var round = 'r_20';
    var publicId = ',d_avatar2.png/non_existing_id.jpg';
    var faceUrlTemplate = 'http://res.cloudinary.com/demo/image/facebook/';

    return cloudinary.faceUrl(faceUrlTemplate,width,height,type,faces,round,publicId);
};

//
cloudinary.genFaceUrl = function(publicId){
    var width = 'w_150';
    var height = 'h_150';
    var type = 'c_thumb';
    var faces = 'g_faces';
    var round = 'r_20';

    var faceUrlTemplate = 'http://res.cloudinary.com/soar/image/upload/';

    return cloudinary.faceUrl(faceUrlTemplate,width,height,type,faces,round,'/'+publicId+'.jpg');
    //return cloudinary.url(publicId+'.jpg', {width: 90, height: 90, crop: "thumb", gravity: "face"})
    //return cloudinary.faceUrl(width,height,type,faces,round,publicId);
};

cloudinary.faceUrl = function(urlTemplate,width,height,type,faces,round,publicId){

    var faceUrl = urlTemplate+ width+','+ height+','+ type+','+faces+',' + round + publicId;
    return faceUrl;
};

/**
 * generate small face
 * @return {*}
 */
cloudinary.genSmallDefaultFaceUrl = function(){
    var width = 'w_40';
    var height = 'h_40';
    var type = 'c_thumb';
    var faces = 'g_faces';
    var round = 'r_4';
    var publicId = ',d_avatar2.png/non_existing_id.jpg';
    var faceUrlTemplate = 'http://res.cloudinary.com/demo/image/facebook/';

    return cloudinary.faceUrl(faceUrlTemplate,width,height,type,faces,round,publicId);
};
cloudinary.genSmallFaceUrl = function(publicId){
    var width = 'w_40';
    var height = 'h_40';
    var type = 'c_thumb';
    var faces = 'g_faces';
    var round = 'r_4';

    var faceUrlTemplate = 'http://res.cloudinary.com/soar/image/upload/';

    return cloudinary.faceUrl(faceUrlTemplate,width,height,type,faces,round,'/'+publicId+'.jpg');
    //return cloudinary.url(publicId+'.jpg', {width: 90, height: 90, crop: "thumb", gravity: "face"})
    //return cloudinary.faceUrl(width,height,type,faces,round,publicId);
};

/**
 * generate mini face for user
 * @param publicId
 * @return {*}
 */
cloudinary.genMiniFaceUrl = function(publicId){

    var width = 'w_20';
    var height = 'h_20';
    var type = 'c_thumb';
    var faces = 'g_faces';
    var round = 'r_4';
    var faceUrlTemplate = 'http://res.cloudinary.com/soar/image/upload/';

    return cloudinary.faceUrl(faceUrlTemplate,width,height,type,faces,round,'/'+publicId+'.jpg');

};
cloudinary.genDefaultMiniFaceUrl = function(){

    var width = 'w_20';
    var height = 'h_20';
    var type = 'c_thumb';
    var faces = 'g_faces';
    var round = 'r_4';
    var publicId = ',d_avatar2.png/non_existing_id.jpg';
    var faceUrlTemplate = 'http://res.cloudinary.com/demo/image/facebook/';

    return cloudinary.faceUrl(faceUrlTemplate,width,height,type,faces,round,publicId);

};


/**
 * gen small face for some scenario
 * @param faceId
 * @return {*}
 */
cloudinary.genSmallFace = function(faceId){
    if(_.isNull(faceId) || _.isUndefined(faceId)){
        var faceUrl = cloudinary.genSmallDefaultFaceUrl();
        return faceUrl;
    }else{
        var faceUrl = cloudinary.genSmallFaceUrl(faceId);
        return faceUrl;
    }

};


/**
 * generate a face for edit
 * @param faceId
 * @return {*}
 */
cloudinary.genEditFace = function(faceId){
    if(_.isNull(faceId) || _.isUndefined(faceId)){
        var faceUrl = cloudinary.genDefaultFaceUrl();
        return faceUrl;
    }else{
        var faceUrl = cloudinary.genFaceUrl(faceId);
        return faceUrl;
    }
};

/**
 * generate a mini face
 * @param faceId
 * @return {*}
 */
cloudinary.genMiniFace = function(faceId){
    if(_.isNull(faceId) || _.isUndefined(faceId)){
        var faceUrl = cloudinary.genDefaultMiniFaceUrl();
        return faceUrl;
    }else{
        var faceUrl = cloudinary.genMiniFaceUrl(faceId);
        return faceUrl;
    }

};


cloudinary.genBlogFace = function(faceId){
    return this.genEditFace(faceId);
};


module.exports = cloudinary;