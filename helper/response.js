const resParam = require("./responses");
const _ = require("lodash");

exports.success = (res, data, code = "", statusCode = 200) => {
  const resData = {
    success: true,
    message: resParam.getMessage(code, "DEFAULT"),
    statusCode: statusCode,
    data,
    messageCode: code,
  };
  return res.status(statusCode).send(resData);
};

exports.keyAlreadyExist = (res, err, code = "", statusCode = 409) => {
  const resData = {
    success: false,
    statusCode: statusCode,
    message: resParam.getMessage(code, "DEFAULT"),
    data: {},
    error: err,
    messageCode: code,
  };
  return res.status(statusCode).send(resData);
};

exports.sendUnexpected = (res, err, code, statusCode = 500) => {
  const resData = {
    success: false,
    statusCode: statusCode,
    message: resParam.getMessage(code, "DEFAULT_INTERNAL_SERVER_ERROR"),
    data: err,
    messageCode: code,
  };
  return res.status(statusCode).send(resData);
};

exports.sendJoiError = (res, code = "", err, statusCode = 400) => {
  let JoiError = _.map(err.details, ({ message, context, type, path }) => ({
    message: message.replace(/['"]/g, ""),
    type,
    path,
  }));
  let messageDisplay = resParam.getMessage(code, "DEFAULTERR");
  if (JoiError && JoiError.length > 0 && JoiError[0].message) {
    messageDisplay = JoiError[0].message;
  }
  let response = {
    success: false,
    statusCode: statusCode,
    message: messageDisplay,
    error: JoiError,
    messageCode: code,
  };
  return res.status(statusCode).send(response);
};

exports.notFound = (res, code, statusCode = 404) => {
  const resData = {
    success: false,
    statusCode: statusCode,
    message: resParam.getMessage(code, "DEFAULTER") || "Invalid request data",
    data: {},
    messageCode: code,
  };
  return res.status(statusCode).send(resData);
};

exports.unAuthentication = (res, data, code = "", statusCode = 401) => {
  const resData = {
    success: false,
    statusCode: statusCode,
    message: resParam.getMessage(code, "DEFAULT_AUTH"),
    data,
    messageCode: code ? code : "DEFAULT_AUTH",
  };
  return res.status(statusCode).send(resData);
};

exports.send = (res, code = "", statusCode = 203, data = {}) => {
  let response = {
    success: false,
    statusCode: statusCode,
    data,
    message: resParam.getMessage(code, "DEFAULTER"),
    messageCode: code,
  };
  return res.status(statusCode).send(response);
};
