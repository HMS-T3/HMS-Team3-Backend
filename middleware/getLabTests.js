const labTests = require("../constants/labTests");
const msgHandler = require("../functions/msgHandler");
const _ = require('lodash');

module.exports.getLabTests = (req, res) => {
	res.status(200).json(msgHandler.pass(_.shuffle(labTests)));
};