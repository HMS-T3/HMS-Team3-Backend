"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

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

const database = "HMS-T3";
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.CLUSTER_MONGO}/${database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

const routes = require("./router/router.js");

let defaultConsoleLogCounter = 1;

app.use("*", (req, res, next) => {
  console.warn(
    `${defaultConsoleLogCounter++}.)`,
    [
      ` Request received at : `,
      req.url,
      req.method,
      req.body,
      req.params,
      req.query,
      // req.headers,
      res.statusCode,
    ],
    "\n"
  );
  next();
});

app.use("/app", routes.app);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log("Server Listening at : ", PORT);
});
