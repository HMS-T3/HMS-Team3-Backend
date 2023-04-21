const logs = require("../logs/logs");

module.exports.pass = (msg) => {
  return {
    Response: msg,
    Status: logs.pass,
  };
};

module.exports.fail = (msg) => {
  return {
    Response: msg,
    Status: logs.fail,
  };
};
