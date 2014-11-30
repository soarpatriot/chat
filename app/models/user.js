

var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var utils = require('./utils');



var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true




var moment = require('moment');
moment.lang('zh-cn');


var schemaOptions = {
    toJSON: {
        virtuals: true
    }
};

//Post's Vote
var Vote  = mongoose.Schema({
    postId: {type: Schema.ObjectId, ref: 'Post'},
    favor:Boolean,
    voteDate:  { type: Date, default: Date.now }
},schemaOptions);

var UserSchema = mongoose.Schema({
    name: 'String',
    password: 'String',
    faceId: 'String',
    gender: { type: String, default: '未知' },
    email:'String',
    regTime:{ type: Date, default: Date.now },
    votePosts:[Vote],
    score:{type: Number, default: 0},

    url:'String',
    deleteUrl:'String',
    smallUrl:'String',
    thumbnailUrl:'String',
    miniUrl:'String'

},schemaOptions);


//virtual properties
var fromNow = UserSchema.virtual('fromNow');
fromNow.get(function(){
    return moment(this.regTime).fromNow();
});

//virtual property need definded behind User
var mini = UserSchema.virtual('mini');
mini.get(function(){

    if(this.miniUrl){
        return this.miniUrl;
    }else{
        return face(null,20,20);
    }

});

var thumbnails = UserSchema.virtual('thumbnails');
thumbnails.get(function(){

    if(this.thumbnailUrl){
        //return cloudinary.genSmallFace(this.faceId);
        return this.thumbnailUrl;
    }else{
        return face(null,40,40);
    }

});

var normalFace = UserSchema.virtual('normalFace');
normalFace.get(function(){

    if(this.smallUrl){
        //return cloudinary.genBlogFace(this.faceId);
        return this.smallUrl;
    }else{
        return face(null,150,150);
    }

});

var face = function(faceId, width,height){

    return '/images/noavatar92.png';
}

var regTimeStr = UserSchema.virtual('regTimeStr');
regTimeStr.get(function(){
    if(utils.isNotEmpty(this.regTime)){
        return moment(this.regTime).format('YYYY年MMMDD a h:mm:ss');
    }
});


var flyAge = UserSchema.virtual('flyAge');
flyAge.get(function(){
    if(utils.isNotEmpty(this.regTime)){
        var now = moment(new Date());
        var regTime = moment(this.regTime);
        return now.diff(regTime,'days');
    }
});

UserSchema.statics.top5 = function(callback){
    return this
        .find()
        .sort('-pubTime')
        .limit(5)
        .exec(callback);
};
var User = mongoose.model('User', UserSchema);
module.exports = User;




/**
User.clearError = function(){

    console.log("ddddd");

    User.find(function(err, users){
        console.log("aaa");
        _.each(users,function(user){

             if(user.url){
                 var deleteUrl = user.deleteUrl.replace('128.199.205.154:8888','static.soaror.com'),
                     url = user.url.replace('128.199.205.154:8888','static.soaror.com'),
                     thumbnailUrl = user.thumbnailUrl.replace('128.199.205.154:8888','static.soaror.com'),
                     smallUrl = user.smallUrl.replace('128.199.205.154:8888','static.soaror.com'),
                     miniUrl = user.miniUrl.replace('128.199.205.154:8888','static.soaror.com');

                 //console.log("update111....   "+post.images[i]._id);
                 //Image.find()a
                 user.deleteUrl = deleteUrl ;
                 user.url = url ;
                 user.thumbnailUrl = thumbnailUrl ;
                 user.smallUrl = smallUrl ;
                 user.miniUrl = miniUrl ;

                 user.save(function(err){
                     console.log("sssss")
                 });

             }







        });
    });


};**/
/**
User.top5 = function(callback){
    return User.where('passed').equals(true)
        .limit(5)
        .sort('-score')

        .exec(callback);
};**/




/*
 UserSchema.pre('save', function (next) {
 console.log('this face url: '+this.faceUrl);
 if(_.isNull(this.faceUrl) || _.isUndefined(this.faceUrl)){
 console.log('default face url: '+cloudinary.genDefaultFaceUrl());
 this.faceUrl = cloudinary.genDefaultFaceUrl();
 };
 next();
 });



 UserSchema.pre('update', function (next) {
 console.log('this face url: '+this.faceUrl);
 if(_.isNull(this.faceUrl) || _.isUndefined(this.faceUrl)){
 console.log('default face url: '+cloudinary.genDefaultFaceUrl());
 this.faceUrl = cloudinary.genDefaultFaceUrl();
 };
 next();
 });**/