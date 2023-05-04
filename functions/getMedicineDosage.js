const _ = require("lodash");

module.exports = () => {
  return {
    morning: _.random(1, 4),
    afternoon: _.random(1, 4),
    night: _.random(1, 4),
  };
};
