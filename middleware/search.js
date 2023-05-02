const User = require("../handler/models.js").User;
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const specialization = require("../constants/specilization.js");


module.exports.search = async (req,res) => {
    const {searchString} = req.body;

    
   
    if(searchString){
        const results = await User.find({
            $or: [
              { "info.name": { $regex: searchString, $options: "i" } },
              { "doctorInfo.specialization": { $regex: searchString, $options: "i" } },
            ],
          });
    console.log(results)
    res.status(200).json(msgHandler.pass(results))
    }
}