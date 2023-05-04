const medicines = require("../constants/medicineName");
const msgHandler = require("../functions/msgHandler");
const _ = require('lodash');

module.exports.getMedicine = (req, res) => {
	res.status(200).json(msgHandler.pass(_.shuffle(medicines)));
};
