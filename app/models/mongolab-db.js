/**
 * Created with JetBrains WebStorm.
 * User: soar
 * Date: 12-9-12
 * Time: 上午12:36
 * To change this template use File | Settings | File Templates.
 */

var settings = require('../../settings');
var dbUrl = settings.currentDb();
var mongoose = require('mongoose');
var db = mongoose.createConnection(dbUrl);
//var db = mongoose.createConnection('mongodb://soarpatriot:22143521@localhost:27017/xiaodonggua')
exports.db = db;
