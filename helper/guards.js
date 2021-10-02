const jwt = require("jsonwebtoken");
const commonResponse = require("./response");
const config = require("../config");
const User = require("../services/user/user.model");

const createUserToken = (user) => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
    type: "user",
  };
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.user_token_expire,
  });
  payload.token = token;
  return payload;
};

const verifyJWT = (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.verify(token, config.jwt.secret);
    req.user = userInfo;
    return 1;
  } catch (error) {
    return 0;
  }
};

const isAuthorized = (users) => async (req, res, next) => {
  const isVerify = verifyJWT(req, res);
  if (isVerify) {
    if (users.indexOf(req.user.type) === -1) {
      commonResponse.unAuthentication(res, {}, "REQUEST_NOT_ALLOWED", 403);
    } else {
      if (req.user.type === "user" && users.indexOf("user") > -1) {
        const user = await User.findById(req.user.id);
        if (!user) {
          commonResponse.unAuthentication(res, {}, "USER_NOT_FOUND");
        } else {
          next();
        }
      } else if (req.user.type === "admin" && users.indexOf("admin") > -1) {
        next();
      } else {
        commonResponse.unAuthentication(res, {}, "REQUEST_NOT_ALLOWED", 403);
      }
    }
  } else {
    commonResponse.unAuthentication(res, {});
  }
};

module.exports = {
  createUserToken,
  isAuthorized,
};
