/**
 * posts controller
 * @author Soar
 *
 */

var Post = require('../models/post.js'),
    md = require('github-flavored-markdown').parse,
    utils = require('../models/utils'),
    User = require('../models/user.js'),
    Tag = require('../models/tag.js'),
    Q = require('q'),
    logger = require('../../log4js').logger('posts_controller');
//var client = require('../models/redis.js')

var cloudinary = require('../models/cloudinary.js');


var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true

var moment = require('moment');
moment.lang('zh-cn');

/**
 * redirect to post page
 * @param req
 * @param res
 */
exports.new = function(req, res){
    Tag.find({},function(err,tags){
        if(err){
            return req.redirect('/posts/new')
        }
        res.render('posts/new', {
            title: '发表',
            user : req.user,
            tags: tags,
            currentLink: 'MICRO',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    })

};

/**
 * publish a post
 * @param req
 * @param res
 * @return {*}
 */
exports.create = function(req, res){
    var currentUser = req.user;
    var content =  req.body.content;
    var title = req.body.title;
    var tag = req.body.tag;

    var countryId = req.body.countryId || '';
    var provinceId = req.body.provinceId || '';
    var districtId = req.body.districtId || '';
    var countyId = req.body.countyId || '';

    var countryText = req.body.countryText || '';
    var provinceText = req.body.provinceText || '';
    var districtText = req.body.districtText || '';
    var countyText = req.body.countyText || '';

    console.log("countryId:"+countryId+" provinceId:"+provinceId," districtId:"+districtId," countyId:"+countyId)
    console.log("countryText:"+countryText+" provinceText:"+provinceText," districtText:"+districtText," countyId:"+countyText)


    if(currentUser === null){
        req.flash('error','请先登录！ ');
        return res.redirect('/login');
    }

    if( !content || !title ){
        req.flash('error','发言内容不能为空！ ');
        return res.redirect('/posts/new');
    }

    if( !tag ){
        req.flash('error','标签不能为空！ ');
        return res.redirect('/posts/new');
    }

    var post = new Post({
        username: currentUser.name,
        content: content,
        title: title,
        tag: tag,
        creator:currentUser._id,

        countryId:countryId,
        countryText:countryText,
        provinceId:provinceId,
        provinceText:provinceText,
        districtId:districtId,
        districtText:districtText,
        countyId:countyId,
        countyText:countyText

    });

    post.save(function(err){
        if(err){
            req.flash('error',err);
            return res.redirect('/posts/new');
        }else{
            req.flash('success','发表成功待审核！');
            res.redirect('/users/'+currentUser._id);
        }
    });

}

/**
 * publish a comment
 * @param req
 * @param res
 * @return {*}
 */
exports.comment = function(req,res){
    var postId = req.body.postId;
    var currentUser = req.user;
    var content =  req.body.content;

    if(utils.isObjEmpty(currentUser)){
        req.flash('error','请先登录！ ');
        return res.redirect('/posts/'+postId);
    }

    if(utils.isEmpty(content)){
        req.flash('error','发言内容不能为！ ');
        return res.redirect('/posts/'+postId);
    }

    Post.findOne({'_id':postId}, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/posts/'+postId);
        }

        post.comments.push({ content: content,creator: currentUser._id});
        post.save(function(err){
            if(err){
                req.flash('error',err);
            }else{
                req.flash('success','发表成功！');
                return res.redirect('/posts/'+postId);
            }
        });
    });
}

/**
 * view one post by id
 * @param req
 * @param res
 */
exports.show = function(req,res){

    logger.info("request show page from ip: ["+req.ip + "]   and ips :"+ "["+req.ips+"]");

    var postId = req.params.id;
    Post.populateCommentsCreatorByPostId(postId, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }

        post = Post.markdownComment(post)
        var html = md(post.content);
        html = html.replace(/\{([^}]+)\}/g, function(_, name){
            return options[name] || '';
        })

        post.content = html;
        //update the number of being looked
        var lookedNumber = post.get("looked")+1;
        post.update({ looked:lookedNumber}, { multi: true }, function (err, numberAffected, raw) {

        });

        res.render('posts/show',{
            title: post.title,
            post: post,
            user: req.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        })
    });
}



/**
 * backbone used, home page top5 posts
 * @param req
 * @param res
 */
exports.index = function(req,res){

    var user = req.user;
    var page = {};
    var state = {
        totalRecords:0,
        currentPage:1
    }

    console.log("p: "+req.query.p);
    var pageSize = req.query.pageSize || 5;
    state.currentPage = req.query.p || req.query.page;
    var start = (state.currentPage - 1) * pageSize;
    
    var tagKey = req.query.tag;
    
    console.log("tag:"+tagKey+"  state.currentPage: "+state.currentPage);
    //all the error control
    var showError = function(err){
        if(err){
            res.send(err);
        }
    };

    //return data to client
    var clientResult = function(posts){
        formattedPosts = Post.dealPosts(posts);
        if(!user){
            formattedPosts = Post.doDone(posts);
            page.models = formattedPosts;
            //console.log('formattedPosts:  page: '+JSON.stringify(page));
            return res.send(page);
        }else{
            //done and undone user's up and down
            User.findOne({'_id':user._id}, function(err,user){
                var votes = user.votePosts;

                _.each(votes,function(vote){

                    _.each(posts,function(post){

                        if(_.isEqual(vote.postId ,post._id)){

                            post.done = true;
                        }
                    });
                });
                page.models = formattedPosts;
                return res.send(page);

            });
        }
    };

    //fill the page info and check the start
    var fillPageInfo = function(totalCount){
        if(start > totalCount ){
            start =  0;
            state.currentPage = 1;
        }
        state.totalRecords = totalCount;
        page.state = state;
    }

    // get post without tag
    var postsResult = function(totalCount){
        console.log('postsResult: '+totalCount);
        fillPageInfo(totalCount);
        return Post.find().where('passed').equals(true)
            .where('score').gte(-10)
            .skip(start)
            .limit(pageSize)
            .sort('-pusTime')
            .populate('creator')
            .exec();

    };


    var countPost = function(tag){
        if(tag){
             return Post.count().where('passed').equals(true)
                .where('tag').equals(tag._id)
                .where('score').gte(-10).exec().then(function(totalCount){
                     fillPageInfo(totalCount);
                     return Post.find().where('passed').equals(true)
                         .where('score').gte(-10)
                         .where('tag').equals(tag._id)
                         .skip(start)
                         .limit(pageSize)
                         .sort('-pusTime')
                         .populate('creator')
                         .exec();
                 });
        }else{
             return Post.count().where('passed').equals(true)
                .where('score').gte(-10).exec();
        }

    };

    if(tagKey){
        return Tag.findOne({key:tagKey}).exec()
                        .then(countPost)
                        .then(clientResult,showError);
    }else{
        return countPost(null)
            .then(postsResult).then(clientResult,showError);
    }
};

exports.destroy = function(req,res){

    var user = req.user;

    Post.remove({ _id: req.body.postId }, function (err) {
        if (err) {
            req.flash('error', '删除失败！');
            return handleError(err);
        }else{
            req.flash('success', '删除成功！');
            res.redirect('/users/'+user._id+'/'+req.body.currentPage);
        }
    });
}


/**
 * user up and down a post
 * only login user can up and down a post
 *
 * @param req
 * @param res
 */
exports.up = function(req,res){

    var up = req.body.up;
    var down = req.body.down;
    var postId = req.body._id;
    var user = req.user;

    Post.findOne({ _id: postId },function(err,post){
        if(err){
            console.log('find post error in up and down');
        }else{
            if(!_.isNull(up) && !_.isUndefined(up)){
                post.up = up;
                post.score =  post.down + post.up;
            }
            if(!_.isNull(down) && !_.isUndefined(down)){
                post.down = down;
                post.score =  post.down + post.up;
            }
            post.save(function(err){

                if(err){
                    console.log('save uped and downed post error in up and down');
                }else{

                    User.findOne({'_id':user._id}, function(err,user){
                        if(err){
                            console.log('user find error in up and down');
                        }else{
                            var favor = false;
                            if(!_.isNull(up) && !_.isUndefined(up)){
                                favor = true;
                            }

                            user.votePosts.push({ postId: postId, favor:favor});
                            user.save(function(err){
                                if(err){
                                    console.log('save uped and downed user info  error in up and down');
                                }else{
                                    res.send("success!");
                                }
                            });
                        }
                    });
                    res.send("success!");
                }
            });
        }

    });
}

/**
 * retry for post an article
 * @param req
 * @param res
 */

exports.retry = function(req,res){

    var user = req.user;

    var postId = req.body.postId;

    var retried = parseInt(req.body.retried) + 1;

    var currentPage = req.body.currentPage;

    Post.update({ _id: postId},{retried:retried,passed:null},{ multi: true }, function (err, numberAffected, raw) {

        if (err){
            req.flash('error','申诉错误！ 请试一次，或联系管理员。');
            res.redirect('/users/'+user._id+'/'+currentPage);
        }else{
            req.flash('success', '诉讼成功！');
            res.redirect('/users/'+user._id+'/'+currentPage);
        }

    });
}