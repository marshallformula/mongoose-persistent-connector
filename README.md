mongoose-persistent-connector
-----------------------------

`mongoose-persistent-connector` is a simple connection utility for mongoose/mongodb connections.  It's a simple wrapper around the connection that will re-attempt connecting to the database upon when it disconnects on a specified retry interval.

Example:
```javascript
var connector = require('mongoose-persistent-connector');

connector.connect('mongodb://127.0.0.1', {log: true, retryInterval: 6000});
```

### mongoURL
The url of the mongodb database.  Defaults to `mongodb://127.0.0.1`.

### connectionOpts
- `log`
  Set this to `true` to output log connection messages messages.  Defaults to `true`.

- `retryInterval`
  Number of milliseconds to wait between connection attempts. Defaults to `6000`.

### mongoOpts
- MongodDB connection options passed to `mongoose.connect()`.