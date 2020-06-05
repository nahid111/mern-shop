const ErrorResponse = require("../utils/errorResponse");

//========================================================================================
//                                Custom Error Handler
//========================================================================================
const errorHandler = (err, req, res, next) => {

  let error = { ...err }
  error.message = err.message;
  
  console.log(err.stack.red);
  // console.log('The Copied Error Object'.brightYellow, error);

  // Mongoose Bad ObjectId error
  if (error.name === "CastError") {
    const msg = `Resource not found with the id ${error.value}`;
    error = new ErrorResponse(404, msg);
  }

  // Mongoose Duplicate Key error
  if (error.code === 11000) {
    const msg = `Duplicate field value entered`;
    error = new ErrorResponse(400, msg);
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const msg = Object.values(error.errors).map(val => val.message);
    error = new ErrorResponse(400, msg);
  }

  /* Return Error Response with Status-code & Message */
  console.log(` errorHandler ==>>   ${error.message.red} `.red.bgBrightYellow);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error"
  });

};

module.exports = errorHandler;
