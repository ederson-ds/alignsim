const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
var path = require("path");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT);
console.log("Server running on port 3000 http://localhost:3000/");
