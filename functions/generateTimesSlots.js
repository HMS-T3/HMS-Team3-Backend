module.exports = (from = 0, to = 24) => {
  const times = [];

  for (let hour = from; hour <= to; hour++) {
    for (let minute of ["00", "30"]) {
      times.push(`${hour.toString().padStart(2, "0")}:${minute}`);
    }
  }
  return times;
};
