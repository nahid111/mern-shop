const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Required']
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
    match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a Valid email' ]
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  avatar: {
      type: String
  },
  role: {
    type: String,
    default: 'user'
  }
}, 
{ timestamps: true });



//===========================================================
//        Mongoose middlewares / Mongoose Hooks
//===========================================================

// Encrypt password using bcrypt
UserSchema.pre("save", async function(next) {
  // run this middleware only when the pasword is changed
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


//===========================================================
//                  Mongoose Methods
//===========================================================

// Sign JWT / Generate Token and return
UserSchema.methods.getSignedJwtToken = function(jwtExpire=process.env.JWT_EXPIRE) {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: jwtExpire});
};


// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generate & Return hashed password Reset-Token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate random token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash the token and set it to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  // Set expire to 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};


module.exports = mongoose.model('User', UserSchema);

 