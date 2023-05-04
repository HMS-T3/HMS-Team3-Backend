const medicines = require("../constants/medicineName");
const msgHandler = require("../functions/msgHandler");
const _ = require("lodash");
const getMedicineDosage = require("../functions/getMedicineDosage");

module.exports.getMedicine = (req, res) => {
  const { getMedicines } = req.query;
  res.status(200).json(
    msgHandler.pass(
      _.shuffle(medicines)
        .map((a) => {
          return { ...a, ...getMedicineDosage() };
        })
        .slice(0, getMedicines)
    )
  );
};
