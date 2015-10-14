module.exports = (app) ->
  db = require('../data/db')
  telemetryInfo = require('../telemetryInfo.json')
  db.save telemetryInfo, (err, res) ->
    if err
      console.error err
    else
      console.log res
    return
  return
