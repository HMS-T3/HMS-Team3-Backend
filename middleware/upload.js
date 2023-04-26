const cloudinary = require("../functions/cloudinary.js");
const fs = require("fs");

module.exports.upload = async (req, res) => {
  res.setHeader("Content-Type", "multipart/form-data");

  //   console.log(req.file.path);

  await cloudinary(req.file.path)
    .then(async (result) => {
      try {
        await fs.unlinkSync(req.file.path);
        console.log("File deleted!");
      } catch (err) {
        console.error(err);
      }
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};
