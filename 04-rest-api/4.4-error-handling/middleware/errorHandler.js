export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || "Something broke!",
  });
}
