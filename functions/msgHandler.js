const logs = require("../logs/logs");

module.exports.pass = (msg) => {
  return {
    msg: msg,
    status: logs.pass,
  };
};

module.exports.fail = (msg) => {
  return {
    msg: msg,
    status: logs.fail,
  };
};
