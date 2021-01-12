class AppError extends Error {
  // inheriting form builtin error class
  constructor(message, statusCode) {
    super(message); // builtingerror only accepts message
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    
    // status may be fail or error depending on the status code
    this.isOperational = true; // we will test for this property and only send these error
    Error.captureStackTrace(this, this.constructor);
    // add stacktrace(source of error ) and exclude the error constructor class
  }
}
module.exports = AppError;
