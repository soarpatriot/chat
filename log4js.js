var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },{
            type: 'file',
            filename: 'log/access.log',
            maxLogSize: 1024 * 1024,
            backups:4
        }
    ],
    replaceConsole: true
});
//var logger = log4js.getLogger('normal');
//logger.setLevel('INFO');

exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}