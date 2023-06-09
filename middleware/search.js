const User = require("../handler/models.js").User;
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const specialization = require("../constants/specilization.js");
const enums = require("../constants/enum");

module.exports.search = async (req, res) => {
  const { searchString, searchBy } = req.query;

  let searchQuery = [];
  if (searchBy === "name")
    searchQuery = [{ "info.name": { $regex: searchString, $options: "i" } }];
  else if (searchBy === "specialization")
    searchQuery = [
      { "doctorInfo.specialization": { $regex: searchString, $options: "i" } },
    ];
  else if (searchBy === "both")
    searchQuery = [
      { "info.name": { $regex: searchString, $options: "i" } },
      {
        "doctorInfo.specialization": { $regex: searchString, $options: "i" },
      },
    ];

  if (searchString) {
    const results = await User.find({
      $or: searchQuery,
    })
      .then((r) => {
        let search = [];

        search = r
          .filter((a) => a.role === enums.role_doctor)
          .map((a) => {
            return {
              id: a._id,
              name: a.info.name,
              specialization: a.doctorInfo.specialization,
              profileImg: a.info.profileImg,
              gender: a.info.biologicalGender,
            };
          });

        res.status(200).json(msgHandler.pass(search));
      })
      .catch((e) => res.status(200).json(msgHandler.fail("Some Error")));
  }
};
