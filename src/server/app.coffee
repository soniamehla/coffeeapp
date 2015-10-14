'use strict'
express = require('express')
app = express()
bodyParser = require('body-parser')
cookieParser = require('cookie-parser')
compress = require('compression')
cors = require('cors')
favicon = require('serve-favicon')
logger = require('morgan')
cradle = require('cradle')
port = process.env.PORT or 7200
routes = undefined
db = require('./data/db.js')
environment = process.env.NODE_ENV
app.use bodyParser.urlencoded(extended: true)
app.use bodyParser.json()
app.use compress()
# Compress response data with gzip
app.use logger('dev')
# app.use(favicon(__dirname + '/favicon.ico'));
app.use cors()
# enable ALL CORS requests
# app.use(errorHandler.init);
routes = require('./route')(app)
console.log 'About to crank up node'
console.log 'PORT=' + port
console.log 'NODE_ENV=' + environment
console.log '123aaaaaaaaaaaaasdsdsdsd23'
app.get '/aaa', (req, res) ->
  res.status(200).json abc: 'def'
  return
switch environment
  when 'stage', 'build'
    console.log '** BUILD **'
    console.log 'serving from ' + './build/'
    app.use '/', express.static('./build/')
  else
    console.log '** DEV **'
    console.log 'serving from ' + './src/client/ and ./'
    app.use '/', express.static('./src/client/')
    app.use '/', express.static('./')
    break
app.listen port, ->
  console.log 'Express server listening on port ' + port
  console.log 'env = ' + app.get('env') + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd()
  return
  
