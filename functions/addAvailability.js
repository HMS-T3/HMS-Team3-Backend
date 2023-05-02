const axios = require("axios");
var qs = require("qs");

module.exports = async (baseUrl, id, day, sTime, eTime) => {
  var config = {
    method: "get",
    url: `${baseUrl}/test/getTimeSlots?f=${sTime}&t=${eTime}&getSlots=true`,
  };
  const dates = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  //for each loop
  // console.log(dates[0].length, dates[0]);
  dates.forEach(async (date) => {
    // console.log(id);
    // console.log(date);
    var data = {
      day: day,
      //   day: "21-04-2023",
      startTime: date[0],
      endTime: date[1],
    };
    var config = {
      method: "post",
      url: `${baseUrl}/app/addAvailability?doctorId=${id}`,
      data: data,
    };
    console.log(config, data);
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
