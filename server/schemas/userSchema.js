const Joi = require("@hapi/joi");


const registerUser = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  password: Joi.string().min(6).required()
});


const createUser = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  password: Joi.string().min(6).required()
});


const updateUser = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(6)
});


const userSchema = {
  registerUser,
  createUser,
  updateUser
};


module.exports = userSchema;

