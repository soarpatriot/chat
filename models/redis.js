/**
 * Created with JetBrains WebStorm.
 * User: soar
 * Date: 12-9-12
 * Time: 上午12:36
 * To change this template use File | Settings | File Templates.
 */

var redis = require("redis"),
    client = redis.createClient("9585","redis://redistogo:7f1833cf57a21657371835dcae43e016@spadefish.redistogo.com");

module.exports = client;


