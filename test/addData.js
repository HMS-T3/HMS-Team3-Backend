const User = require("../handler/models.js").User;
const axios = require("axios");
const specialization = require("../constants/specilization.js");
const hash = require("../functions/hash");
const generateTimeSlots = require("../functions/generateTimesSlots");

function removeUnderscore(str) {
  return str.replace(/_/g, " ");
}

function removeSeparators(str) {
  return str.replace(/[_\-\s()\[\]]+/g, "");
}

module.exports.addUsers = async (req, res) => {
  const { nums, userR } = req.query;

  const response = await axios
    .get(`https://randomuser.me/api/?results=${nums}`)
    .then((r) => {
      return r.data["results"];
    })
    .catch((e) => {
      return e;
    });
  let flag = false;

  for (let i = 0; i < response.length; i++) {
    const randomSpec = specialization.map((e) => e.specialization)[
      Math.floor(Math.random() * specialization.length)
    ];
    // console.log(response[i]["login"]["sha256"]);
    let obj = new Object();
    if (userR === "doctor")
      obj["doctorInfo"] = {
        degree: "MBBS",
        experience: Math.floor(Math.random() * 10),
        description:
          "A board-certified physician specializing in family medicine. She received her medical degree from the University of California, San Francisco, and completed her residency training at the University of California, Los Angeles.",
        specialization: removeUnderscore(randomSpec),
      };

    obj["email"] = response[i]["email"];
    obj["phoneNumber"] = removeSeparators(response[i]["phone"]);

    obj["role"] = userR;
    let fname =
      response[i]["name"]["first"] + " " + response[i]["name"]["last"];
    if (userR === "doctor") fname = "Dr. " + fname;
    obj["info"] = {
      profileImg: response[i]["picture"]["large"],
      name: fname,
      dateOfBirth: response[i]["dob"]["date"],
      phoneNumber: response[i]["phone"],
      biologicalGender: response[i]["gender"],
    };
    obj["password"] = response[i]["login"]["sha256"];
    const user = new User(obj);
    await user
      .save()
      .then((r) => (flag = true))
      .catch((e) => res.send(e));
  }

  flag ? res.send("Success") : res.send("Failed");
};

module.exports.getTimeSlots = async (req, res) => {
  const { f, t } = req.query;
  res.send(generateTimeSlots(parseInt(f), parseInt(t)));
};
