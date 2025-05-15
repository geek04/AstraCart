export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle JWT errors separately
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Internal Server Error',
    },
  });
};