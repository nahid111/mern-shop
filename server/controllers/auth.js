const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendEmail');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');


// Helper function to Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    
    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
    }
    
    res
      .status(statusCode)
      .cookie("token", token, cookieOptions)
      .json({ success: true, token });
};


// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // If user exists
  let user = await User.findOne({ email: email });
  if (user) {
      return next(new ErrorResponse(400, "Email already exists"));
  }

  // Create user
  user = await User.create({ name, email, password, role });

  // Get reset token
  const emailToken = user.getSignedJwtToken(process.env.JWT_EXPIRE_EMAIL);

  const verifyUrl = `http://localhost:3000/verify-email/${emailToken}`;
  const message = `
  <div style="text-align: center; padding: 20px; line-height: 2; font-size: 1.2rem">
    You have Registered successfully. <br />
    Visit the following link to verify your email and continue to login <br /><br />
    <a href="${verifyUrl}"
      style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 1rem; font-weight: bold">
      VERIFY EMAIL
    </a>
    <p style="color: red;">
      This link will expire after the next ${process.env.JWT_EXPIRE_EMAIL} hours
    </p>
  </div>
  `;

  // send email 
  try {
    await sendEmail({ email: user.email, subject: "mern-app Verify Email", message });
    res.status(200).json({ success: true, data: "Verification Email sent" });
  }
  catch (err) {
    console.log(err);
    return next(new ErrorResponse(500, "Sending Verification Email Failed"));
  }
});


// @desc      Verify Email
// @route     POST /api/v1/auth/register
// @access    Public
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const token = req.params.emailtoken;

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // update user
    user = await User.findByIdAndUpdate(decoded.id, { emailVerified: true });
    res.status(200).json({ success: true, data: "Email Verified. Login to continue" });
  } catch (err) {
    return next(new ErrorResponse(401, "Token expired or invalid"));
  }
});


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse(400, "Email & Password Required"));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse(401, "Invalid credentials"));
  }

  if (!user.emailVerified) {
    return next(new ErrorResponse(401, "Please confirm your email first"));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(401, "Invalid credentials"));
  }

  sendTokenResponse(user, 200, res);
});


// @desc      Logout / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), //expire in 10 seconds
    httpOnly: true
  });

  res.status(200).json({ success: true, data: {} });
});


// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse(404, "User Not Found with the given email"));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  // update user to save the tokens
  await user.save({ validateBeforeSave: false });

  // Create reset url for api like http://devcamper.io/api/v1/auth/resetpassword/:resettoken
  // Create reset url for Frontend like http://localhost:3000/reset-password/:token

  /*
  // req.protocol returns http or https
  // req.get('host') returns the domain name
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) have requested to reset a password. Please make a PUT request to: \n\n ${resetUrl}`;
  */

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  const message = `
  <div style="text-align: center; padding: 20px; line-height: 2; font-size: 1.2rem">
    You are receiving this email because you (or someone else) have requested to reset a password. <br />
    Visit the following link to reset your password <br /><br />
    <a href="${resetUrl}"
      style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 1rem; font-weight: bold">
      RESET PASSWORD
    </a>
  </div>
  `;

  // send email with password reset token
  try {
    await sendEmail({ email: user.email, subject: "mern-app Reset Password", message });
    res.status(200).json({ success: true, data: "Reset Password Email sent" });
  }
  catch (err) {
    console.log(err);

    // discard exixting tokens on error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse(500, "Sending Reset Password Email Failed"));
  }
});


// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get token from url & Hash it
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resettoken).digest("hex");

  // find user by the resetPasswordToken only if the expiration is greater than current time
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse(400, "Invalid token"));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // send token so that user is logged in after resetting password
  sendTokenResponse(user, 200, res);
});


// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});


// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse(401, "Password is incorrect"));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});


// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {

  let user = await User.findById(req.user._id);
  
  let fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const file = req.file;

  // delete previous file if exists
  if(file){
    if(user.avatar && user.avatar !== "no-photo.jpg"){
      const filePath = path.join(process.env.FILE_UPLOAD_PATH, user.avatar);
      if (fs.existsSync(filePath)) {
        console.log(` Deleting ${filePath} `.black.bgMagenta);
        fs.unlink(filePath, (err) => err && next(err));
      }
    }

    fieldsToUpdate = {
      ...fieldsToUpdate,
      avatar: file.filename
    }
  }

  // update user
  user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate);
  res.status(200).json({ success: true, data: user });
});



