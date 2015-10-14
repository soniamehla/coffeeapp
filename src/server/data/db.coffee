
# Configure database using cradle

cradle = require('cradle')

db = new (cradle.Connection)().database('mydb')

module.exports = db