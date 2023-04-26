const User = require("../handler/models.js").User;
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");

module.exports.getUserDetails = async (req, res) => {
  const { user_id, role, detailsYouNeed, exceptDetailsYouDonNeed } = req.query;
  let fields;
  const newArray = [];
  if (detailsYouNeed && exceptDetailsYouDonNeed)
    return res.status(200).json(msgHandler.fail(logs[13]));
  if (detailsYouNeed) {
    fields = detailsYouNeed;
    fields.split(" ").forEach((word) => {
      newArray.push(word);
    });
    console.log(newArray);
    console.log(fields);
  }
  if (exceptDetailsYouDonNeed) {
    fields = exceptDetailsYouDonNeed;
    fields.split(" ").forEach((word) => {
      newArray.push(`-${word}`);
    });
    console.log(newArray);
    console.log(fields);
  }

  await User.findOne(
    {
      _id: user_id,
      role: role,
    },
    // [fields, "-__v"]
    newArray
  )
    .populate("appointments")
    .exec()
    .then((r) =>
      r
        ? res.status(200).json(msgHandler.pass(r))
        : res.status(200).json(msgHandler.fail(logs[12]))
    )
    .catch((e) => res.status(200).json(msgHandler.fail(logs[12])));
};
