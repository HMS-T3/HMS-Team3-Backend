const labTests = require("../constants/labTests");
const msgHandler = require("../functions/msgHandler");

module.exports.getLabTests = (req, res) => {
	const { returnParams } = req.query;
	let returnVal = labTests;
	// if (returnParams === "keys") returnVal = Object.keys(labTests);
	// if (returnParams === "values") returnVal = Object.values(labTests);
	res.status(200).json(msgHandler.pass(returnVal));
};