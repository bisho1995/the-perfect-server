"use strict";

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const compression = require("compression");
const helmetCsp = require("helmet-csp");
const handlebars = require("handlebars");
const fs = require("fs");
const { csp } = require("./csp");

const app = express();

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));

app.use(express.static(__dirname + "/public"));

app.disable("x-powered-by");

const addNonce = (req, _, next) => {
  req.nonce = Math.floor(Math.random() * 1e5);

  next();
};

app.use([compression(), addNonce, helmetCsp(csp)]);

const template = handlebars.compile(
  fs.readFileSync("./templates/index.hbs", { encoding: "utf-8" })
);

app.all("*", (req, res) => {
  res.header("Content-type", "text/html");
  res.header({
    "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
    Expires: "Thu, 01 Jan 1970 00:00:00 GMT",
    Pragma: "no-cache",
    "Last-Modified": Date.now(),
  });
  const hbsData = { nonce: req.nonce };

  res.status(200).send(template(hbsData));
});

const port = 3080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
