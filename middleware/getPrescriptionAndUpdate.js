const User = require("../handler/models.js").User;
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");
const Appointment = require("../schemas/Appointment.js");
const Prescription = require("../schemas/Prescription.js");

module.exports.getPrescriptionAndUpdate = async (req, res) => {
  const {
    appointment_id,
    diagnosis,
    medicineName,
    timeOfTheDay,
    amount,
    amountTypes,
    labTestName,
    labTestResult,
  } = req.body;
  const appointment = await Appointment.findOne({
    _id: appointment_id,
  });

  const prescriptions = await Prescription.findOne({
    _id: appointment_id,
  })
    new Prescription({
    _id: appointment_id,
    diagnosis: diagnosis,
    // medicine: {
      name: medicineName,
    //   dosage: {
        timeOfTheDay: timeOfTheDay,
        amount: amount,
        amountType: amountTypes,
    //   },
    // },
    // labTest: {
      name: labTestName,
      results: labTestResult,
    // },
  })
 //   .exec()
    .save()
    .then(async (r) => {
        const prescriptionUpdate = {
          medicine: [...prescriptions.medicine, r._id],
        };
    await User.findOneAndUpdate(
            {
              _id: prescriptionUpdate._id,
            },
            prescriptionUpdate
          )

            .then( (r) => {
                console.log("here")
                res.status(200).json(msgHandler.pass(logs[22]))})
            .catch((e) => res.status(200).json(msgHandler.fail(e)));
    })
    .catch((e) => false);
    
    if(appointment) {
    await Prescription.findOne({
      _id: appointment_id,
    })
      //   .populate("prescriptions")
      .then((r) => {
        console.log("Rrrr", r);
        return res.status(200).json(msgHandler.pass(r));
      })
      .catch((e) => res.status(200).json(msgHandler.fail(e)));
  } else {
    return res.status(200).json(msgHandler.fail(logs[7]));
  }

};
