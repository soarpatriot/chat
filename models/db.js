/**
 * Created with JetBrains WebStorm.
 * User: soar
 * Date: 12-9-12
 * Time: 上午12:36
 * To change this template use File | Settings | File Templates.
 */
var settings = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var server = new Server(settings.host, settings.port,
    {auto_reconnect:true}
)


module.exports = new Db(settings.db, server);