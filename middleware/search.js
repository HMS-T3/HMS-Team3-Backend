const User = require("../handler/models.js").User;
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const specialization = require("../constants/specilization.js");
const enums = require("../constants/enum")

module.exports.search = async (req,res) => {
    const {searchString} = req.query;

    
   
    if(searchString){
        const results = await User.find({
            $or: [
              { "info.name": { $regex: searchString, $options: "i" } },
              { "doctorInfo.specialization": { $regex: searchString, $options: "i" } },
            ],
          })
          .then((r) =>{
            const search = r
            .filter((a)=>a.role === enums.role_doctor)
            .map((a) =>{
                return {"id": 
                        "name": a.info.name,
                        "specialization": a.doctorInfo.specialization,
                        "profileImg": a.info.profileImg,
                        "Gender": a.info.biologicalGender,
                        }
            })
            console.log(search)

            return search
            
          })
    console.log(results)
    res.status(200).json(msgHandler.pass(results))
    }
}