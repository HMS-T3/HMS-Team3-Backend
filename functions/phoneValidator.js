module.exports = function (phone) {
  const regex = /^(\+91[\s]?)?[0]?(91)?[56789]\d{9}$/;
  if (regex.test(phone)) {
    return true;
  } else {
    return false;
  }
};
