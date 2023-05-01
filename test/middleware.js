const addData = require("./addData");

const middleware = {
  addUsers: addData.addUsers,
  getTimeSlots: addData.getTimeSlots,
};

module.exports = middleware;
