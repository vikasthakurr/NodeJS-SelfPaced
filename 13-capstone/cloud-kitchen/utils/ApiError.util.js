/**
 * Custom API Error class for consistent error responses
 * Extends native Error with statusCode and additional details
 */
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;
  }
}

export default ApiError;
