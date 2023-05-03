const cloudinary = require("../functions/cloudinary.js");
const fs = require("fs");
const msgHandler = require("../functions/msgHandler.js");

module.exports.upload = async (req, res) => {
  res.setHeader("Content-Type", "multipart/form-data");

  //   console.log(req.file.path);
  //check if file type is image
  if (
    req.file.mimetype !== "image/jpeg" &&
    req.file.mimetype !== "image/png" &&
    req.file.mimetype !== "image/gif"
  ) {
    return res
      .status(200)
      .json(msgHandler.fail({ Error: "Invalid file type" }));
  }

  await cloudinary(req.file.path)
    .then(async (result) => {
      try {
        await fs.unlinkSync(req.file.path);
        console.log("File deleted!");
      } catch (err) {
        console.error(err);
      }
      res.status(200).json(msgHandler.pass({ Link: result }));
    })
    .catch((error) => {
      return res.status(200).json(msgHandler.fail(error));
    });
};
