'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var retry = undefined,
    doLog = undefined,
    dbURL = undefined,
    opts = undefined;

function log(level, msg) {
  if (doLog) console[level](msg);
}

function connectDB() {
  log('info', 'attempting mongodb connection : ' + dbURL);
  _mongoose2['default'].connect(dbURL, opts);
};

_mongoose2['default'].connection.on('error', function (err) {
  log('error', err);
});

_mongoose2['default'].connection.on('connected', function () {
  log('info', 'mongodb connected');
});

var dbRetryTimer = undefined;
_mongoose2['default'].connection.on('disconnected', function () {
  log('error', 'mongodb disconnected! retrying in ' + retry / 1000 + ' seconds...');

  if (dbRetryTimer) clearTimeout(dbRetryTimer);
  dbRetryTimer = setTimeout(connectDB, retry);
});

exports['default'] = {
  /**
   * Main connect function
   * @param {string} mongoURL The url of the mongo connection.  Defaults to 'mongodb://127.0.0.1'
   * @param {object} connectionOpts Options for this module
   * @param {boolean} connectionOpts.log Whether to enable logging.  Defaults to true
   * @param {number} connectionOpts.retryInterval The number of ms to wait in between connection retry attempts. Defaults to 6000.
   * @param {object} mongoOpts Mongodb connection options passed to mongoose.connect()
   */
  connect: function connect() {
    var mongoURL = arguments.length <= 0 || arguments[0] === undefined ? 'mongodb://127.0.0.1' : arguments[0];

    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$log = _ref.log;
    var log = _ref$log === undefined ? true : _ref$log;
    var _ref$retryInterval = _ref.retryInterval;
    var retryInterval = _ref$retryInterval === undefined ? 6000 : _ref$retryInterval;
    var mongoOpts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    dbURL = mongoURL;
    doLog = log;
    retry = retryInterval;
    opts = mongoOpts;

    connectDB();
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozt3QkFBcUIsVUFBVTs7OztBQUcvQixJQUFJLEtBQUssWUFBQTtJQUFFLEtBQUssWUFBQTtJQUFFLEtBQUssWUFBQTtJQUFFLElBQUksWUFBQSxDQUFDOztBQUU5QixTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQzs7QUFHRCxTQUFTLFNBQVMsR0FBRztBQUNuQixLQUFHLENBQUMsTUFBTSx1Q0FBcUMsS0FBSyxDQUFHLENBQUM7QUFDeEQsd0JBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMvQixDQUFDOztBQUdGLHNCQUFTLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsR0FBRyxFQUFDO0FBQzNDLEtBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDbkIsQ0FBQyxDQUFDOztBQUVILHNCQUFTLFVBQVUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVU7QUFDNUMsS0FBRyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0NBQ2xDLENBQUMsQ0FBQzs7QUFHSCxJQUFJLFlBQVksWUFBQSxDQUFDO0FBQ2pCLHNCQUFTLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFlBQVU7QUFDL0MsS0FBRyxDQUFDLE9BQU8seUNBQXVDLEtBQUssR0FBRyxJQUFJLGlCQUFjLENBQUM7O0FBRTdFLE1BQUcsWUFBWSxFQUFFLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1QyxjQUFZLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM3QyxDQUFDLENBQUM7O3FCQUdZOzs7Ozs7Ozs7QUFTYixTQUFPLEVBQUEsbUJBQTRGO1FBQTNGLFFBQVEseURBQUcscUJBQXFCOztxRUFBdUMsRUFBRTs7d0JBQXRDLEdBQUc7UUFBSCxHQUFHLDRCQUFHLElBQUk7a0NBQUUsYUFBYTtRQUFiLGFBQWEsc0NBQUcsSUFBSTtRQUFRLFNBQVMseURBQUcsRUFBRTs7QUFDL0YsU0FBSyxHQUFHLFFBQVEsQ0FBQTtBQUNoQixTQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ1osU0FBSyxHQUFHLGFBQWEsQ0FBQztBQUN0QixRQUFJLEdBQUcsU0FBUyxDQUFDOztBQUdqQixhQUFTLEVBQUUsQ0FBQztHQUNiO0NBQ0YiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5cbmxldCByZXRyeSwgZG9Mb2csIGRiVVJMLCBvcHRzO1xuXG5mdW5jdGlvbiBsb2cobGV2ZWwsIG1zZykge1xuICBpZiAoZG9Mb2cpIGNvbnNvbGVbbGV2ZWxdKG1zZyk7XG59XG5cblxuZnVuY3Rpb24gY29ubmVjdERCKCkge1xuICBsb2coJ2luZm8nLCBgYXR0ZW1wdGluZyBtb25nb2RiIGNvbm5lY3Rpb24gOiAke2RiVVJMfWApO1xuICBtb25nb29zZS5jb25uZWN0KGRiVVJMLCBvcHRzKTtcbn07XG5cblxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCBmdW5jdGlvbihlcnIpe1xuICBsb2coJ2Vycm9yJywgZXJyKTtcbn0pO1xuXG5tb25nb29zZS5jb25uZWN0aW9uLm9uKCdjb25uZWN0ZWQnLCBmdW5jdGlvbigpe1xuICBsb2coJ2luZm8nLCAnbW9uZ29kYiBjb25uZWN0ZWQnKTtcbn0pO1xuXG5cbmxldCBkYlJldHJ5VGltZXI7XG5tb25nb29zZS5jb25uZWN0aW9uLm9uKCdkaXNjb25uZWN0ZWQnLCBmdW5jdGlvbigpe1xuICBsb2coJ2Vycm9yJywgYG1vbmdvZGIgZGlzY29ubmVjdGVkISByZXRyeWluZyBpbiAke3JldHJ5IC8gMTAwMH0gc2Vjb25kcy4uLmApO1xuXG4gIGlmKGRiUmV0cnlUaW1lcikgY2xlYXJUaW1lb3V0KGRiUmV0cnlUaW1lcik7XG4gIGRiUmV0cnlUaW1lciA9IHNldFRpbWVvdXQoY29ubmVjdERCLCByZXRyeSk7XG59KTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBNYWluIGNvbm5lY3QgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vbmdvVVJMIFRoZSB1cmwgb2YgdGhlIG1vbmdvIGNvbm5lY3Rpb24uICBEZWZhdWx0cyB0byAnbW9uZ29kYjovLzEyNy4wLjAuMSdcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbm5lY3Rpb25PcHRzIE9wdGlvbnMgZm9yIHRoaXMgbW9kdWxlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29ubmVjdGlvbk9wdHMubG9nIFdoZXRoZXIgdG8gZW5hYmxlIGxvZ2dpbmcuICBEZWZhdWx0cyB0byB0cnVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjb25uZWN0aW9uT3B0cy5yZXRyeUludGVydmFsIFRoZSBudW1iZXIgb2YgbXMgdG8gd2FpdCBpbiBiZXR3ZWVuIGNvbm5lY3Rpb24gcmV0cnkgYXR0ZW1wdHMuIERlZmF1bHRzIHRvIDYwMDAuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBtb25nb09wdHMgTW9uZ29kYiBjb25uZWN0aW9uIG9wdGlvbnMgcGFzc2VkIHRvIG1vbmdvb3NlLmNvbm5lY3QoKVxuICAgKi9cbiAgY29ubmVjdChtb25nb1VSTCA9ICdtb25nb2RiOi8vMTI3LjAuMC4xJywge2xvZyA9IHRydWUsIHJldHJ5SW50ZXJ2YWwgPSA2MDAwfSA9IHt9LCBtb25nb09wdHMgPSB7fSkge1xuICAgIGRiVVJMID0gbW9uZ29VUkxcbiAgICBkb0xvZyA9IGxvZztcbiAgICByZXRyeSA9IHJldHJ5SW50ZXJ2YWw7XG4gICAgb3B0cyA9IG1vbmdvT3B0cztcblxuXG4gICAgY29ubmVjdERCKCk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=