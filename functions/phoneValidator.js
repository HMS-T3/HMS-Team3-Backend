module.exports = async function (phone) {
  const phoneRegex = /^(\+91|0)?[789]\d{9}$/;
  return phoneRegex.test(phone);
};
