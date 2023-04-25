const User = require("../handler/models.js").User;
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");

module.exports.getPrescriptionAndUpdate = async(req, res) =>{
    const { appointment_id, diagnosis, medicineName, timeOfTheDay, amount, amountTypes, labTestName, labTestResult} = 
        req.body;
    
    let appointment =await Appointment.findOne({
        _id : appointment_id,
    })
    .exec()
    .then((r) => r)
    .catch(() => false);

    let prescription = {};


    try{
        prescription = {
             diagnosis: diagnosis ? diagnosis : prescription.diagnosis,
             medicineName: 
        }
    }

}