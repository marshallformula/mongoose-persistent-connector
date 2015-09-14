import mongoose from 'mongoose';
import bunyan from 'bunyan';


let retry, doLog;

function log(level, msg) {
  if (doLog) console[level](msg);
}


function connectDB(mongoURL, opts) {
  log('info', `attempting mongodb connection : ${mongoURL}`);
  mongoose.connect(mongoURL, opts);
};


mongoose.connection.on('error', function(err){
  log('error', err);
});

mongoose.connection.on('connected', function(){
  log('info', 'mongodb connected');
});


let dbRetryTimer;
mongoose.connection.on('disconnected', function(){
  log('error', `mongodb disconnected! retrying in ${retry / 1000} seconds...`);

  if(dbRetryTimer) clearTimeout(dbRetryTimer);
  dbRetryTimer = setTimeout(connectDB, retry);
});


export default {
  /**
   * Main connect function
   * @param {string} mongoURL The url of the mongo connection.  Defaults to 'mongodb://127.0.0.1'
   * @param {object} connectionOpts Options for this module
   * @param {boolean} connectionOpts.log Whether to enable logging.  Defaults to true
   * @param {number} connectionOpts.retryInterval The number of ms to wait in between connection retry attempts. Defaults to 6000.
   * @param {object} mongoOpts Mongodb connection options passed to mongoose.connect()
   */
  connect(mongoURL = 'mongodb://127.0.0.1', {log = true, retryInterval = 6000} = {}, mongoOpts = {}) {
    doLog = log;
    retry = retryInterval;


    connectDB(mongoURL, mongoOpts);
  }
};
