'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var retry = undefined,
    doLog = undefined;

function log(level, msg) {
  if (doLog) console[level](msg);
}

function connectDB(mongoURL, opts) {
  log('info', 'attempting mongodb connection : ' + mongoURL);
  _mongoose2['default'].connect(mongoURL, opts);
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

    doLog = log;
    retry = retryInterval;

    connectDB(mongoURL, mongoOpts);
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozt3QkFBcUIsVUFBVTs7OztzQkFDWixRQUFROzs7O0FBRzNCLElBQUksS0FBSyxZQUFBO0lBQUUsS0FBSyxZQUFBLENBQUM7O0FBRWpCLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDdkIsTUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2hDOztBQUdELFNBQVMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7QUFDakMsS0FBRyxDQUFDLE1BQU0sdUNBQXFDLFFBQVEsQ0FBRyxDQUFDO0FBQzNELHdCQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDbEMsQ0FBQzs7QUFHRixzQkFBUyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTLEdBQUcsRUFBQztBQUMzQyxLQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ25CLENBQUMsQ0FBQzs7QUFFSCxzQkFBUyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFVO0FBQzVDLEtBQUcsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztDQUNsQyxDQUFDLENBQUM7O0FBR0gsSUFBSSxZQUFZLFlBQUEsQ0FBQztBQUNqQixzQkFBUyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFVO0FBQy9DLEtBQUcsQ0FBQyxPQUFPLHlDQUF1QyxLQUFLLEdBQUcsSUFBSSxpQkFBYyxDQUFDOztBQUU3RSxNQUFHLFlBQVksRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDNUMsY0FBWSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDN0MsQ0FBQyxDQUFDOztxQkFHWTs7Ozs7Ozs7O0FBU2IsU0FBTyxFQUFBLG1CQUE0RjtRQUEzRixRQUFRLHlEQUFHLHFCQUFxQjs7cUVBQXVDLEVBQUU7O3dCQUF0QyxHQUFHO1FBQUgsR0FBRyw0QkFBRyxJQUFJO2tDQUFFLGFBQWE7UUFBYixhQUFhLHNDQUFHLElBQUk7UUFBUSxTQUFTLHlEQUFHLEVBQUU7O0FBQy9GLFNBQUssR0FBRyxHQUFHLENBQUM7QUFDWixTQUFLLEdBQUcsYUFBYSxDQUFDOztBQUd0QixhQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ2hDO0NBQ0YiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGJ1bnlhbiBmcm9tICdidW55YW4nO1xuXG5cbmxldCByZXRyeSwgZG9Mb2c7XG5cbmZ1bmN0aW9uIGxvZyhsZXZlbCwgbXNnKSB7XG4gIGlmIChkb0xvZykgY29uc29sZVtsZXZlbF0obXNnKTtcbn1cblxuXG5mdW5jdGlvbiBjb25uZWN0REIobW9uZ29VUkwsIG9wdHMpIHtcbiAgbG9nKCdpbmZvJywgYGF0dGVtcHRpbmcgbW9uZ29kYiBjb25uZWN0aW9uIDogJHttb25nb1VSTH1gKTtcbiAgbW9uZ29vc2UuY29ubmVjdChtb25nb1VSTCwgb3B0cyk7XG59O1xuXG5cbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKXtcbiAgbG9nKCdlcnJvcicsIGVycik7XG59KTtcblxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignY29ubmVjdGVkJywgZnVuY3Rpb24oKXtcbiAgbG9nKCdpbmZvJywgJ21vbmdvZGIgY29ubmVjdGVkJyk7XG59KTtcblxuXG5sZXQgZGJSZXRyeVRpbWVyO1xubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZGlzY29ubmVjdGVkJywgZnVuY3Rpb24oKXtcbiAgbG9nKCdlcnJvcicsIGBtb25nb2RiIGRpc2Nvbm5lY3RlZCEgcmV0cnlpbmcgaW4gJHtyZXRyeSAvIDEwMDB9IHNlY29uZHMuLi5gKTtcblxuICBpZihkYlJldHJ5VGltZXIpIGNsZWFyVGltZW91dChkYlJldHJ5VGltZXIpO1xuICBkYlJldHJ5VGltZXIgPSBzZXRUaW1lb3V0KGNvbm5lY3REQiwgcmV0cnkpO1xufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogTWFpbiBjb25uZWN0IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtb25nb1VSTCBUaGUgdXJsIG9mIHRoZSBtb25nbyBjb25uZWN0aW9uLiAgRGVmYXVsdHMgdG8gJ21vbmdvZGI6Ly8xMjcuMC4wLjEnXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb25uZWN0aW9uT3B0cyBPcHRpb25zIGZvciB0aGlzIG1vZHVsZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbm5lY3Rpb25PcHRzLmxvZyBXaGV0aGVyIHRvIGVuYWJsZSBsb2dnaW5nLiAgRGVmYXVsdHMgdG8gdHJ1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gY29ubmVjdGlvbk9wdHMucmV0cnlJbnRlcnZhbCBUaGUgbnVtYmVyIG9mIG1zIHRvIHdhaXQgaW4gYmV0d2VlbiBjb25uZWN0aW9uIHJldHJ5IGF0dGVtcHRzLiBEZWZhdWx0cyB0byA2MDAwLlxuICAgKiBAcGFyYW0ge29iamVjdH0gbW9uZ29PcHRzIE1vbmdvZGIgY29ubmVjdGlvbiBvcHRpb25zIHBhc3NlZCB0byBtb25nb29zZS5jb25uZWN0KClcbiAgICovXG4gIGNvbm5lY3QobW9uZ29VUkwgPSAnbW9uZ29kYjovLzEyNy4wLjAuMScsIHtsb2cgPSB0cnVlLCByZXRyeUludGVydmFsID0gNjAwMH0gPSB7fSwgbW9uZ29PcHRzID0ge30pIHtcbiAgICBkb0xvZyA9IGxvZztcbiAgICByZXRyeSA9IHJldHJ5SW50ZXJ2YWw7XG5cblxuICAgIGNvbm5lY3REQihtb25nb1VSTCwgbW9uZ29PcHRzKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==