cloudinary = require('cloudinary');
//cloudinary.CLOUDINARY_URL= 'cloudinary://463734787194182:VPScMiTP4h2wy6C232xExi6rXXk@hdg4eyw5m';
//w_115,h_135,c_thumb,g_faces,r_20

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
    return cloudinary.faceUrl(width,height,type,faces,round);
}

cloudinary.faceUrl = function(width,height,type,faces,round){
    var faceUrlTemplate = 'http://res.cloudinary.com/demo/image/facebook/';
    var faceUrl = faceUrlTemplate+ width+','+ height+','+ type+','+faces+',' + round+ ','+ 'd_avatar2.png/non_existing_id.jpg';
    return faceUrl;
}

module.exports = cloudinary;