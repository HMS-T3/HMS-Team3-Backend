const User = require("../handler/models.js").User;
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");

module.exports.getUserDetails = async (req, res) => {
  const { user_id, role, detailsYouNeed, detailsYouDontNeed } = req.query;
  let newArray = [];

  if (detailsYouNeed) {
    const detailsYouNeedArray = detailsYouNeed.split(",");
    detailsYouNeedArray.forEach((element) => {
      newArray.push(element);
    });
  }
  if (detailsYouDontNeed) {
    const detailsYouDontNeedArray = detailsYouDontNeed.split(",");
    detailsYouDontNeedArray.forEach((element) => {
      newArray.push("-" + element);
    });
  }

  newArray = newArray.filter((e) => e);

  await User.findOne(
    {
      _id: user_id,
      role: role,
    },
    [...newArray, "-password", "-__v"]
  )
    .exec()
    .then((r) =>
      r
        ? res.status(200).json(msgHandler.pass(r))
        : res.status(200).json(msgHandler.fail(logs[12]))
    )
    .catch((e) => res.status(200).json(msgHandler.fail(logs[12])));
};
