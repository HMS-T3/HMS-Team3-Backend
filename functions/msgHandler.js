const logs = require("../logs/logs");

module.exports.pass = (msg) => {
  if (typeof msg === "string") {
    return { Response: { Message: msg }, Status: logs.pass };
  } else {
    return {
      Response: msg,
      Status: logs.pass,
    };
  }
};

module.exports.fail = (msg) => {
  if (typeof msg === "string") {
    return { Response: { Message: msg }, Status: logs.fail };
  } else {
    return {
      Response: msg,
      Status: logs.fail,
    };
  }
};
