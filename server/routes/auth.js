const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const joiValidator = require('../middleware/joiValidator');
const userSchema = require('../schemas/userSchema');
const multerFileUpload = require('../middleware/multerFileUpload');

const {
  register, login, logout, getMe, forgotPassword, resetPassword, updateDetails, updatePassword, verifyEmail
} = require('../controllers/auth');


router.post('/login', login);
router.get('/logout', logout);
router.post('/register', joiValidator(userSchema.registerUser, 'body'), register);
router.get('/verifyemail/:emailtoken', verifyEmail);

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
router.put('/updatedetails', protect, multerFileUpload.single('avatar'), updateDetails);


module.exports = router;
