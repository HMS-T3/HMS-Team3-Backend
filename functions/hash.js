const crypto = require("crypto");
module.exports = function sha256(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
};
