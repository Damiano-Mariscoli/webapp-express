function errorsHandler(err, req, res, next) {
  res.status(500);
  res.json({
    message: err.message,
  });
  next(err);
}

module.exports = errorsHandler;
