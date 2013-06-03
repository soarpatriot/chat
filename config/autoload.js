module.exports = function (compound) {
    return [
        require('ejs-ext'),
        //require('jugglingdb'),

        require('seedjs')
    ];
};

/**
 *
 * heroku scale web=1

 module.exports = {
    cookie_secret : 'secret_meteoric',
    db : 'microblog',
    host : 'localhost',
    port : 27017
}**/