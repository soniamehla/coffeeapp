module.exports = function() {
  var getJsonFromFile, service;
  service = {
    getJsonFromFile: getJsonFromFile
  };
  getJsonFromFile = function(file) {
    var fs, getConfig, json, readJsonFileSync;
    fs = require('fs');
    json = getConfig(file);
    readJsonFileSync = function(filepath, encoding) {
      var file;
      if (typeof encoding === 'undefined') {
        encoding = 'utf8';
      }
      file = fs.readFileSync(filepath, encoding);
      return JSON.parse(file);
    };
    getConfig = function(file) {
      var filepath;
      filepath = __dirname + file;
      return readJsonFileSync(filepath);
    };
    return json;
  };
  return service;
};
