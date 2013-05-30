
var dbConfig = {
    cookie_secret : 'secret_meteoric',
    localMongo : 'mongodb://localhost:27017/xiaodonggua',
    remoteMongolab : 'mongodb://soarpatriot:22143521@ds037837-a.mongolab.com:37837/xiaodonggua'

    //remoteMongolab: 'mongodb://heroku_app7129634:22143521@ds037587.mongolab.com:37587/heroku_app7129634'
}



module.exports = dbConfig;

dbConfig.currentDb = function(){
    return dbConfig.remoteMongolab;
}

/**
 *
 * heroku scale web=1

 module.exports = {
    cookie_secret : 'secret_meteoric',
    db : 'microblog',
    host : 'localhost',
    port : 27017
}**/