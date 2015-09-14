var mongoose = require('mongoose');
var bunyan = require('bunyan');


var defaultMongoURL = 'mongodb://127.0.0.1';
var conLogger;
var retryInterval = 6000;


function log(level, msg) {
    if (conLogger && typeof conLogger[level] === 'function') conLogger[level](msg);
}


var connectDB = function(mongoURL, opts) {
    log('info', 'attempt mongo connection : ',mongoURL);
    mongoose.connect(mongoURL, options);
};


mongoose.connection.on('error', function(err){
    log('error', err);
});

mongoose.connection.on('connected', function(){
    log('info', 'mongo connected');
});


var dbRetryTimer;
mongoose.connection.on('disconnected', function(){
    log('error', 'mongo disconnected!');

    if(dbRetryTimer) clearTimeout(dbRetryTimer);
    dbRetryTimer = setTimeout(connectDB, retryInterval);
});

module.exports = {
    connect: function (mongoURL, mongoOpts, connectorOpts) {
        if(connectorOpts.logger === true) {
            conLogger = bunyan.createLogger({name: 'mongoose-persistant-connector'});;

        } else if (typeof connectorOpts.logger === 'object') {
            conLogger = connectorOpts.logger;
        }

        if(connectorOpts.retryInterval && typeof connectorOpts.retryInterval === 'number') {
            retryInterval = connectorOpts.retryInterval;
        }

        connectDB(mongoURL || defaultMongoURL, mongoOpts);
    }
};
