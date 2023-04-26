const logs = require("../logs/logs");

module.exports.pass = (msg) => {
  return {
    Response: {
      Message: msg,
    },
    Status: logs.pass,
  };
};

module.exports.fail = (msg) => {
  return {
    Response: { Message: msg },
    Status: logs.fail,
  };
};
