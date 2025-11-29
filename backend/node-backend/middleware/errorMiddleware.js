/**
 * Error Middleware
 * ----------------
 * Catches errors thrown in controllers and sends a clean JSON response.
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = { errorHandler };