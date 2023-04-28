const specialties = require("../constants/specilization");
const msgHandler = require("../functions/msgHandler");

module.exports.getSpecialization = (req, res) => {
	const { returnParams } = req.query;
	let returnVal = specialties;
	// if (returnParams === "keys") returnVal = Object.keys(specialties);
	// if (returnParams === "values") returnVal = Object.values(specialties);
	res.status(200).json(msgHandler.pass(returnVal));
};
