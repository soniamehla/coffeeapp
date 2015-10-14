'use strict';
var app, bodyParser, compress, cookieParser, cors, cradle, db, environment, express, favicon, logger, port, routes;

express = require('express');

app = express();

bodyParser = require('body-parser');

cookieParser = require('cookie-parser');

compress = require('compression');

cors = require('cors');

favicon = require('serve-favicon');

logger = require('morgan');

cradle = require('cradle');

port = process.env.PORT || 7200;

routes = void 0;

db = require('./data/db.js');

environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(compress());

app.use(logger('dev'));

app.use(cors());

routes = require('./route')(app);

console.log('Hello');

console.log('About to crank up node');

console.log('PORT=' + port);

console.log('NODE_ENV=' + environment);

console.log('123');

app.get('/aaa', function(req, res) {
  res.status(200).json({
    abc: 'def'
  });
});

switch (environment) {
  case 'stage':
  case 'build':
    console.log('** BUILD **');
    console.log('serving from ' + './build/');
    app.use('/', express["static"]('./build/'));
    break;
  default:
    console.log('** DEV **');
    console.log('serving from ' + './src/client/ and ./');
    app.use('/', express["static"]('./src/client/'));
    app.use('/', express["static"]('./'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});
