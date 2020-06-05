const ErrorResponse = require("../utils/errorResponse");

const joiValidator = (schema, property) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req[property]);
    return next();
  } catch (err) {
    const { details } = err;
    const message = details.map(i => i.message).join(",");
    next(new ErrorResponse(422, message));
  }
};

module.exports = joiValidator;
