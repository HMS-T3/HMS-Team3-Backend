const crypto = require("crypto");

 function sha256(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

module.exports =  (...args) => {
  let string = "";
  for (let arg of args) string += arg;
  return  sha256(string);
};
