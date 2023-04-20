const crypto = require("crypto");

async function sha256(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

module.exports = async (...args) => {
  let string = "";
  for (let arg of args) string += arg;
  return await sha256(string);
};
