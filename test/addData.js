const User = require("../handler/models.js").User;
const axios = require("axios");
const specialization = require("../constants/specilization.js");
const hash = require("../functions/hash");
const generateTimeSlots = require("../functions/generateTimesSlots");
const addAvailability = require("../functions/addAvailability");
const doctorImages = require("../constants/doctors");
const phoneNumbers = require("../constants/phoneNumber");
const _ = require("lodash");
const names = require("../constants/names");

function removeUnderscore(str) {
  return str.replace(/_/g, " ");
}

function removeSeparators(str) {
  return str.replace(/[_\-\s()\[\]]+/g, "");
}

module.exports.addUsers = async (req, res) => {
  const {
    nums,
    userR,
    wantAddAvailability,
    fromDate,
    toDate,
    fromTime,
    toTime,
  } = req.query;

  const response = await axios
    .get(`https://randomuser.me/api/?results=${nums}`)
    .then((r) => {
      // console.log("R", r);
      return r.data["results"];
    })
    .catch((e) => {
      // console.log("Error", e);
      return e;
    });
  let flag = false;

  // console.log("response", response);
  for (let i = 0; i < response.length; i++) {
    const randomSpec = specialization.map((e) => e.specialization)[
      Math.floor(Math.random() * specialization.length)
    ];
    // console.log(response[i]["login"]["sha256"]);

    let obj = new Object();
    if (userR === "doctor")
      obj["doctorInfo"] = {
        degree: "MBBS,MD",
        experience: Math.floor(Math.random() * 20),
        description:
          "A board-certified physician specializing in family medicine. She received her medical degree from the University of California, San Francisco, and completed her residency training at the University of California, Los Angeles.",
        specialization: removeUnderscore(randomSpec),
      };

    obj["email"] = response[i]["email"];
    obj["phoneNumber"] = _.sample(phoneNumbers);

    obj["role"] = userR;
    let fname = _.sample(names) + " " + response[i]["name"]["last"];
    if (userR === "doctor") fname = "Dr. " + fname;
    obj["info"] = {
      profileImg:
        userR === "doctor"
          ? _.sample(doctorImages).imgUrl
          : response[i]["picture"]["large"],
      name: fname,
      dateOfBirth: response[i]["dob"]["date"],
      biologicalGender: response[i]["gender"],
    };
    obj["password"] = await hash("password");
    console.log("Object is: ", obj);
    const user = new User(obj);
    await user
      .save()
      .then(async (r) => {
        if (wantAddAvailability === "true" && userR === "doctor") {
          const startDate = new Date(fromDate);
          const endDate = new Date(toDate);
          let currentDate = startDate;
          try {
            while (currentDate <= endDate) {
              const day = currentDate.getDate().toString().padStart(2, "0");
              const month = (currentDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = currentDate.getFullYear().toString();

              await addAvailability(
                `${req.protocol + "://" + req.get("host")}`,
                r.id,
                `${day}-${month}-${year}`,
                fromTime,
                toTime
              );
              // console.log(`${day}-${month}-${year}`);

              currentDate.setDate(currentDate.getDate() + 1);
            }
            flag = true;
          } catch (e) {
            res.status(200).json(msgHandler.fail(e));
          }
        } else {
          res.send("Fail");
        }
      })
      .catch((e) => res.send(e));
  }

  flag ? res.send("Success") : res.send("Failed");
};

module.exports.getTimeSlots = async (req, res) => {
  const { f, t, getSlots } = req.query;
  //pair two adjacent elements of the array to form a time slot from generateTimeSlots(parseInt(f), parseInt(t))
  const timeSlots = generateTimeSlots(parseInt(f), parseInt(t));
  const timeSlotPairs = [];

  for (let i = 0; i < timeSlots.length - 1; i++) {
    const timeSlotPair = [timeSlots[i], timeSlots[i + 1]];
    timeSlotPairs.push(timeSlotPair);
  }

  res.send(getSlots === "true" ? timeSlotPairs : timeSlots);
};
