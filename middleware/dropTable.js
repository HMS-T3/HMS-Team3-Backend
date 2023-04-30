const User = require("../handler/models.js").User;
const Appointment = require("../handler/models.js").Appointment;
const Availability = require("../handler/models.js").Availability;
const Prescription = require("../handler/models.js").Prescription;
// const msgHandler = require("../functions/msgHandler");

const enums = require("../constants/enum.js");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.dropTable = async (req, res) => {
  const { tableToDrop } = req.query;
  if (tableToDrop === "users")
    User.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
        return res.status(200).json(msgHandler.pass(["Table dropped"]));
      })
      .catch((error) => {
        console.log(error);
      });
  else if (tableToDrop === "appointments")
    Prescription.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
        return res.status(200).json(msgHandler.pass(["Table dropped"]));
      })
      .catch((error) => {
        console.log(error);
      });
  else if (tableToDrop === "availabilities")
    Availability.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
        return res.status(200).json(msgHandler.pass(["Table dropped"]));
      })
      .catch((error) => {
        console.log(error);
      });
  else if (tableToDrop === "prescription")
    Prescription.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
        return res.status(200).json(msgHandler.pass(["Table dropped"]));
      })
      .catch((error) => {
        console.log(error);
      });
  else if (tableToDrop === "all") {
    User.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    Availability.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    Prescription.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    Appointment.collection
      .drop()
      .then(() => {
        console.log("Collection dropped successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    return res.status(200).json(msgHandler.pass(["All tables dropped"]));
  } else return res.status(200).json(msgHandler.fail(["Invalid table name"]));
};
