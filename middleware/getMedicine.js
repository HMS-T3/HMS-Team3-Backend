const medicines = require("../constants/medicineName");
const msgHandler = require("../functions/msgHandler");

module.exports.getMedicine = (req, res) => {
	const { returnParams } = req.query;
	let returnVal = medicines;
	
	res.status(200).json(msgHandler.pass(returnVal));
};
