const home = require("./home");
const login = require("./login");
const register = require("./register");

const middleware = {
  home: home.home,
  login_patient: login.patient,
  login_staff: login.staff,
  register_patient: register.patient,
  register_staff: register.staff,
};

module.exports = middleware;
