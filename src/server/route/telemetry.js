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
};
