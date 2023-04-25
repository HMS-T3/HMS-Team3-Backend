const User = require("../handler/models.js").User;
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");
const Appointment = require("../schemas/Appointment.js");
const Prescription = require("../schemas/Prescription.js");

module.exports.getPrescriptionAndUpdate = async(req, res) =>{
    const { prescription_id, appointment_id, diagnosis, medicineName, timeOfTheDay, amount, amountTypes, labTestName, labTestResult} = 
        req.body;
    
    const appointment =await Appointment.findOne({
        _id : appointment_id,
    })

    const prescriptions = await Prescription.findOne({
        _id: prescription_id,
    })
    .exec()
    .then((r) => r)
    .catch(() => false);

    let prescription = {};


    try{
        prescription = {
             diagnosis: diagnosis ? diagnosis : prescriptions.diagnosis,
             medicine: {
             name : medicineName ? medicineName : prescriptions.medicine.name,
             dosage: {
                timeOfTheDay: timeOfTheDay ? timeOfTheDay : prescriptions.medicine.dosage.timeOfTheDay,
                amount: amount ? amount : prescriptions.medicine.dosage.amount,
                amountType: amountTypes ? amountTypes : prescription.medicine.dosage.amountTypes,
             },
            },
            labTest : {
                name: labTestName ? labTestName : prescription.labTest.name,
                results: labTestResult ? labTestResult : prescription.labTest.labTestResult,
            },
        };
    } catch(e){
        prescription = {
            diagnosis: diagnosis ,
            medicine: {
            name : medicineName,
            dosage: {
               timeOfTheDay: timeOfTheDay,
               amount: amount,
               amountType: amountTypes,
            }, 
           },
           labTest : {
               name: labTestName ,
               results: labTestResult ,
           },
       };
   } 
   if (appointment) {
    await Appointment.findOneAndUpdate(
      {
        _id: appointment_id,
      },
      prescription
    )
      .then((r) => res.status(200).json(msgHandler.pass(r)))
      .catch((e) => res.status(200).json(msgHandler.fail(e)));
  } else {
    return res.status(200).json(msgHandler.fail(logs[7]));
  }
};



