const specialties = require("../constants/specilization");
const msgHandler = require("../functions/msgHandler");
const _ = require('lodash');

module.exports.getSpecialization = (req, res) => {
	res.status(200).json(msgHandler.pass(_.shuffle(specialties)));
};
