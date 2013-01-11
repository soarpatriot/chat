/**
 * Created with JetBrains WebStorm.
 * User: soar
 * Date: 12-9-12
 * Time: 上午12:36
 * To change this template use File | Settings | File Templates.
 */

var redis = require("redis"),
    client = redis.createClient("9585","spadefish.redistogo.com");
    client.auth("7f1833cf57a21657371835dcae43e016",function(data){
        console.log("sdfsd: "+data);
    });

    /**
    client.set("foo_rand000000000000", "OK----");

    // This will return a JavaScript String
    client.get("foo_rand000000000000", function (err, reply) {
        console.log(reply.toString()); // Will print `OK`
    });
    //client.end();**/
exports.client = client;


