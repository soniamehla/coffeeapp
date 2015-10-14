module.exports = (app) ->
  db = require('../data/db')
  telemetryInfo = require('../telemetryInfo.json')
  db.save telemetryInfo, (err, res) ->
    if err
      console.error err
    else
      console.log res
    return
  db.save '_design/telemetryViews',
    all: map: (doc) ->
      emit doc.time, doc
      return
    altitude: map: (doc) ->
      emit doc.time, doc.altitude
      return
  db.view 'telemetryViews/all', {
    descending: true
    limit: 15
  }, (err, res) ->
    console.log 'Get latest:'
    res.forEach (key, row, id) ->
      console.log '%s: %s %s %s', key, row.altitude, row.latitude, row.longitude
    return
  db.view 'telemetryViews/altitude', (err, res) ->
    console.log 'Altitude data:'
    res.forEach (key, row, id) ->
      console.log '%s: %s', key, row
      return
    return
  return
