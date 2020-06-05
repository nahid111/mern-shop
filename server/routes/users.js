const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');
const queryFilter = require('../middleware/queryFilter');
const joiValidator = require('../middleware/joiValidator');
const userSchema = require('../schemas/userSchema');
const User = require('../models/User');


const {
  getAllUsers, getUserById, createUser, updateUser, deleteUser
} = require('../controllers/users');


// make all routes private
router.use(protect);
// Authorize all routes for the Admin Role only
router.use(authorize('admin'));

router.get("/", queryFilter(User), getAllUsers);
router.post("/", joiValidator(userSchema.createUser, 'body'), createUser);
router.get("/:id", getUserById);
router.put("/:id", joiValidator(userSchema.updateUser, 'body'), updateUser);
router.delete("/:id", deleteUser);


module.exports = router;
