const Joi = require("@hapi/joi");
const { commonResponse } = require("../../helper");

exports.login = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });

  let data = schema.validate(req.body);

  if (data.hasOwnProperty("error")) {
    commonResponse.sendJoiError(res, "REQUIRED_FIELD_VALIDATION", data.error);
  } else {
    next();
  }
};

exports.add = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });

  let data = schema.validate(req.body);

  if (data.hasOwnProperty("error")) {
    commonResponse.sendJoiError(res, "REQUIRED_FIELD_VALIDATION", data.error);
  } else {
    next();
  }
};

exports.changePasswordByOTP = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().max(50).required(),
    otp: Joi.string().max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });

  let data = schema.validate(req.body);

  if (data.hasOwnProperty("error")) {
    commonResponse.sendJoiError(res, "REQUIRED_FIELD_VALIDATION", data.error);
  } else {
    next();
  }
};

exports.changePassword = (req, res, next) => {
  const schema = Joi.object().keys({
    old_password: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });

  let data = schema.validate(req.body);

  if (data.hasOwnProperty("error")) {
    commonResponse.sendJoiError(res, "REQUIRED_FIELD_VALIDATION", data.error);
  } else {
    next();
  }
};
