const User = require("../handler/models").User;
const addAvailability = require("../functions/addAvailability");
module.exports.addBulkAvailability = async (req, res, next) => {
  const { userId, fromDate, toDate, fromTime, toTime } = req.query;

  User.findOne({
    _id: userId,
  })
    .then((r) => {})
    .catch((e) => {
      console.log(e);
    });
};
