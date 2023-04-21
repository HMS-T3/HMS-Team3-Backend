"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");

app.use(cors());

const header = {
  1: "Access-Control-Allow-Origin",
  2: "*",
  3: "Access-Control-Allow-Headers",
  4: "Origin, X-Requested-With, Content-Type, Accept",
};

app.use(function (req, res, next) {
  res.header(header[1], header[2]);
  res.header(header[3], header[4]);
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let dbLink = "";
let redisLink = "";

if (app.get("env") === "development") {
  // do something in local environment
  // dbLink = `mongodb://localhost:27017`;
  dbLink = `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.CLUSTER_MONGO}/${process.env.DATABASE_NAME}`;
  console.log(msgHandler.pass("Local Environment"));
} else {
  // do something in production environment
  dbLink = `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.CLUSTER_MONGO}/${process.env.DATABASE_NAME}`;
  console.log(msgHandler.pass("Production Environment"));
}

mongoose.set("strictQuery", false);
mongoose
  .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(msgHandler.pass(logs[1]));
  })
  .catch((err) => {
    console.log(msgHandler.fail(logs[2]), err);
  });

const routes = require("../router/router.js");

let defaultConsoleLogCounter = 1;

app.use("*", (req, res, next) => {
  console.warn(
    `${defaultConsoleLogCounter++}.)`,
    msgHandler.pass([
      ` Request received at : `,
      req.url,
      req.method,
      req.body,
      req.params,
      req.query,
      res.statusCode,
    ]),
    "\n"
  );
  next();
});

app.use("/app", routes.app);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(msgHandler.pass(`${logs[3]} ${PORT}`));
});
