export default function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something broke!";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
