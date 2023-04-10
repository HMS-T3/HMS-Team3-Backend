const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
var path = require("path");

router.get("/", middleware.home);

module.exports.app = router;
