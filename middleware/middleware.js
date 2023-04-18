const home = require("./home");
const login = require("./login");
const register = require("./register");

const middleware = {
  home: home.home,
  login_patient: login.patient,
  login_doctor: login.doctor,
  register_patient: register.patient,
  register_doctor: register.doctor,
};

module.exports = middleware;
