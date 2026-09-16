export default function errorHandler(err, req, res, next) {
  console.log(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
