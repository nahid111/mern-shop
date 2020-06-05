const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


//========================================================================================
//                                  Protect routes
//========================================================================================
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // settoken from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }
  // else if (req.cookies.token) {
  //   // set token from cookie
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse(401, "Please Log in to Continue"));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // add user to the request object
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse(401, "Please Log in to Continue"));
  }
});


//========================================================================================
//                                  Check User Roles
//========================================================================================
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(403, `User role ${req.user.role} is not authorized to access this route`)
      );
    }
    next();
  };
};

