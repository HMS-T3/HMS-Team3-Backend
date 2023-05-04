const User = require("../handler/models").User;
const enums = require("../constants/enum");
const msgHandler = require("../functions/msgHandler");

module.exports.getChatBool = async (req, res, next) => {
  const { user_id, role, chat } = req.query;

  await User.findOne({
    _id: user_id,
    role: role,
  })
    .populate([
      {
        path: role === enums.role_doctor ? "schedule" : "appointments",
        populate: [
          {
            path: "patient",
            select: "info.name info.profileImg email phoneNumber ",
          },
          {
            path: "doctor",
            select: "info.name info.profileImg email phoneNumber",
          },
          //   {
          //     path: "timeSlot",
          //   },
        ],
      },
    ])
    .then((user) => {
      if (user) {
        let filterUser = user[
          role === enums.role_doctor ? "schedule" : "appointments"
        ].filter((a) => {
          return a.chat === (chat === "true" ? true : false);
        });

        return res.status(200).json(msgHandler.pass(filterUser));
      } else {
        return res.status(200).json(msgHandler.fail([]));
      }
    })
    .catch((err) => {
      return res.status(200).json(msgHandler.fail([]));
    });
};
