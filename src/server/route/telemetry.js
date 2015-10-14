module.exports = function(app) {
  var db, telemetryInfo;
  db = require('../data/db');
  telemetryInfo = require('../telemetryInfo.json');
  db.save(telemetryInfo, function(err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
  db.save('_design/telemetryViews', {
    all: {
      map: function(doc) {
        emit(doc.time, doc);
      }
    },
    altitude: {
      map: function(doc) {
        emit(doc.time, doc.altitude);
      }
    }
  });
  db.view('telemetryViews/all', {
    descending: true,
    limit: 15
  }, function(err, res) {
    console.log('Get latest:');
    res.forEach(function(key, row, id) {
      return console.log('%s: %s %s %s', key, row.altitude, row.latitude, row.longitude);
    });
  });
  db.view('telemetryViews/altitude', function(err, res) {
    console.log('Altitude data:');
    res.forEach(function(key, row, id) {
      console.log('%s: %s', key, row);
    });
  });
};
