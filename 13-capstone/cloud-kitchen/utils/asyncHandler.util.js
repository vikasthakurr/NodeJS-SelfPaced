/**
 * Wraps an async route handler to catch errors and pass them to next()
 * Eliminates the need for try-catch in every controller
 * @param {Function} fn - Async route handler function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
