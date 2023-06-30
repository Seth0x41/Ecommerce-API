const ErrorHandlingDevMode = (err, res) =>
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });
const ErrorHandlingProductionMode = (err, res) =>
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.statusCode || `error`;
  if (process.env.NODE_ENV === "development") {
    ErrorHandlingDevMode(err, res);
  } else {
    ErrorHandlingProductionMode(err, res);
  }
};

module.exports = globalError;
