"use strict";

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const compression = require("compression");
const helmetCsp = require("helmet-csp");

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

const csp = {
  directives: {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      (req) => (req.nonce ? `'nonce-${req.nonce}'` : ""),
    ],
    "style-src": ["'self'", (req) => (req.nonce ? `'nonce-${req.nonce}'` : "")],
    "img-src": ["'self'"],
    "font-src": ["'self'"],
    "frame-src": ["'self'"],
    "child-src": ["'self'"],
    "worker-src": ["'self'"],
  },
};

app.use([compression(), addNonce, helmetCsp(csp)]);

app.all("*", (req, res) => {
  res.render("index", { nonce: req.nonce });
});

const port = 3080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
