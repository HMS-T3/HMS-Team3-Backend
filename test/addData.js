const User = require("../handler/models.js").User;
const axios = require("axios");
const specialization = require("../constants/specilization.js");

function removeUnderscore(str) {
  return str.replace(/_/g, " ");
}

function removeSeparators(str) {
  return str.replace(/[_\-\s()\[\]]+/g, "");
}

module.exports.addData = async (req, res) => {
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
    let obj = {};
    if (userR === "doctor")
      obj["specialization"] = removeUnderscore(
        Object.keys(specialization)[Math.floor(Math.random() * 5)]
      );
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
    obj[
      "password"
    ] = `${response[i]["login"]["password"]}${response[i]["login"]["password"]}`;
    const user = new User(obj);
    await user
      .save()
      .then((r) => (flag = true))
      .catch((e) => res.send(e));
  }

  flag ? res.send("Success") : res.send("Failed");
};
