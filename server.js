const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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

const routes = require("./router/router.js");

app.use("*", (req, res, next) => {
  console.log([
    [
      "Request received at : ",
      req.url,
      req.method,
      req.body,
      req.params,
      req.query,
      req.headers,
      res.statusCode,
    ],
  ]);
  next();
});

app.use("/app", routes.app);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log("Server Listening at : ", PORT);
});
