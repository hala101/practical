require("dotenv").config();

console.log("MONGO => ", process.env.DB_HOST);
module.exports = {
  mongo: {
    uri: process.env.DB_HOST,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    secureConnection:
      process.env.SMTP_SECURE_CONNECTION === "true" ? true : false,
    port: parseInt(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASSWORD,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    user_token_expire: process.env.USER_TOKEN_EXPIRE,
  },
  admin: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  firebase: {
    url: process.env.FIREBASE_URL,
    app_key: process.env.FIREBASE_APP_KEY,
    domain_prefix: process.env.FIREBASE_DOMAIN_PREFIX,
    short_link_url: process.env.FIREBASE_SHORT_LINK_URL,
    android_pkg_name: process.env.FIREBASE_ANDROID_PKG_NAME,
    ios_bundle_id: process.env.FIREBASE_IOS_BUNDLE_ID,
  },
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
  tytoon_mongo: {
    uri: process.env.TYTOON_DB_HOST,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
