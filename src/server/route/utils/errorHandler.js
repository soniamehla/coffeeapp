module.exports = function() {
  var init, logErrors, service;
  service = {
    init: init,
    logErrors: logErrors
  };
  init = function(err, req, res, next) {
    var status;
    status = err.statusCode || 500;
    if (err.message) {
      res.send(status, err.message);
    } else {
      res.send(status, err);
    }
    next();
  };

  /* Our fall through error logger and errorHandler */
  logErrors = function(err, req, res, next) {
    var status;
    status = err.statusCode || 500;
    console.error(status + ' ' + (err.message ? err.message : err));
    if (err.stack) {
      console.error(err.stack);
    }
    next(err);
  };
  return service;
};
