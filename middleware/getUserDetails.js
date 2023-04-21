const User = require("../models.js").User;
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");

module.exports.getUserDetails = async (req, res) => {
  const { user_id, role, detailsYouNeed, exceptDetailsYouDonNeed } = req.query;
  let fields;
  if (detailsYouNeed && exceptDetailsYouDonNeed)
    return res.status(200).json(msgHandler.fail(logs[13]));
  if (detailsYouNeed) fields = detailsYouNeed;
  if (exceptDetailsYouDonNeed) fields = `-${exceptDetailsYouDonNeed}`;

  await User.findOne(
    {
      _id: user_id,
      role: role,
    },
    fields
  )
    .exec()
    .then((r) => res.status(200).json(msgHandler.pass(r)))
    .catch((e) => res.status(200).json(msgHandler.fail(logs[12])));
};