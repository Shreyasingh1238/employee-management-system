
const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500 ? "Internal server error" : error.message,
  });
};

module.exports = errorMiddleware;