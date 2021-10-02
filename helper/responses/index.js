exports.getMessage = (code, defaultcode) => {
  let messageFile = require("./messages.json");
  return messageFile[code] ? messageFile[code] : messageFile[defaultcode];
};
