

To connect using the shell:
    mongo ds037587.mongolab.com:37587/heroku_app7129634 -u <user> -p <password>
To connect using a driver via the standard URI (what's this?):
mongodb://<user>:<password>@ds037587-a.mongolab.com:37587/heroku_app7129634



    module.exports = {
        cookie_secret : 'secret_meteoric',
        db : 'microblog',
        host : 'localhost',
        port : 27017
    }



module.exports = {
    cookie_secret : 'secret_meteoric',
    db : 'heroku_app7129634',
    host : 'ds037587-a.mongolab.com',
    user:'85624529@qq.com',
    password:'22143521',
    port : 37587
}