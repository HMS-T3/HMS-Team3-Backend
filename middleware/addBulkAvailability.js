const User = require("../handler/models").User;
const enums = require("../constants/enum");
const addAvailability = require("../functions/addAvailability");
const msgHandler = require("../functions/msgHandler");

module.exports.addBulkAvailability = async (req, res, next) => {
  const { userId, fromDate, toDate, fromTime, toTime } = req.query;

  const convertDateStringToDate = (dateString) => {
    const dateObj = new Date(dateString);
    console.log(dateObj);
    // const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const convertedDateString = `${year}-${month}-${day}`;

    return convertedDateString; // outputs "2023-04-21"
  };

  await User.findOne({
    _id: userId,
    role: enums.role_doctor,
  })
    .then(async (r) => {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      let currentDate = startDate;
      try {
        while (currentDate <= endDate) {
          const day = currentDate.getDate().toString().padStart(2, "0");
          const month = (currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const year = currentDate.getFullYear().toString();

          await addAvailability(
            `${req.protocol + "://" + req.get("host")}`,
            r.id,
            `${day}-${month}-${year}`,
            fromTime,
            toTime
          );
          // console.log(`${day}-${month}-${year}`);

          currentDate.setDate(currentDate.getDate() + 1);
        }
        res.status(200).json(msgHandler.pass("Added Availability"));
      } catch (e) {
        res.status(200).json(msgHandler.fail(e));
      }
    })
    .catch((e) => {
      res.status(200).json(msgHandler.fail("User Not Found or Not a Doctor"));
    });
};
