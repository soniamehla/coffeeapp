module.exports = ->
  service = 
    init: init
    logErrors: logErrors

  init = (err, req, res, next) ->
    status = err.statusCode or 500
    if err.message
      res.send status, err.message
    else
      res.send status, err
    next()
    return

  ### Our fall through error logger and errorHandler  ###

  logErrors = (err, req, res, next) ->
    status = err.statusCode or 500
    console.error status + ' ' + (if err.message then err.message else err)
    if err.stack
      console.error err.stack
    next err
    return

  service

# ---
# generated by js2coffee 2.1.0