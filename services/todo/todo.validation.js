const Joi = require("@hapi/joi");
const { commonResponse } = require("../../helper");

exports.add = (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().max(50).required(),
    description: Joi.string().min(5).max(50).required(),
    user_id: Joi.string().required(),
  });

  let data = schema.validate(req.body);

  if (data.hasOwnProperty("error")) {
    commonResponse.sendJoiError(res, "REQUIRED_FIELD_VALIDATION", data.error);
  } else {
    next();
  }
};
