/**
 * Created with JetBrains WebStorm.
 * User: soar
 * Date: 12-9-12
 * Time: 上午12:36
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://soarpatriot:22143521@ds037837-a.mongolab.com:37837/xiaodonggua');

exports.db = db;
