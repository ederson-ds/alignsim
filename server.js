const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
var path = require("path");
const PORT = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://dbUser:Ekqe00JlxDDIbjMI@cluster0-nz5fy.mongodb.net/alignsim?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const ProductSchema = mongoose.Schema({
  descricao: {
    type: String,
    require: true,
  },
  fornecedor: {
    type: String,
    require: true,
  },
  precocusto: {
    type: String,
    require: true,
  },
  precovenda: {
    type: String,
    require: true,
  },
});

const ContasapagarSchema = mongoose.Schema({
  descricao: {
    type: String,
    require: true,
  },
  vencimento: {
    type: String,
    require: true,
  },
  valorbruto: {
    type: String,
    require: true,
  },
  juros: {
    type: String,
    require: true,
  },
  desconto: {
    type: String,
    require: true,
  },
});

var Product = mongoose.model("Procuct", ProductSchema, "product");
var Contasapagar = mongoose.model("Contasapagar", ContasapagarSchema, "contasapagar");

// get reference to database
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));

app.post("/api/contasapagar/create/", function (req, res) {
  // a document instance
  var contasapagar = new Contasapagar({
    descricao: req.body.descricao,
    vencimento: req.body.vencimento,
    valorbruto: req.body.valorbruto,
    juros: req.body.juros,
    desconto: req.body.desconto,
  });

  contasapagar.save(function (err, collection) {
    res.json(collection);
  });
});

app.post("/api/produtos/create/", function (req, res) {
  // a document instance
  var product = new Product({
    descricao: req.body.descricao,
    fornecedor: req.body.fornecedor,
    precocusto: req.body.precocusto,
    precovenda: req.body.precovenda,
  });

  product.save(function (err, users) {
    res.json(users);
  });
});

app.put("/api/contasapagar/create/:_id", function (req, res) {
  var id = req.params._id;
  const filter = { _id: id };
  const update = {
    descricao: req.body.descricao,
    vencimento: req.body.vencimento,
    valorbruto: req.body.valorbruto,
    juros: req.body.juros,
    desconto: req.body.desconto,
  };
  Contasapagar.findOneAndUpdate(filter, update, { upsert: true }, function (
    err,
    doc
  ) {
    if (err) return res.send(500, { error: err });
    return res.send("Succesfully saved.");
  });
});

app.put("/api/produtos/create/:_id", function (req, res) {
  var id = req.params._id;
  const filter = { _id: id };
  const update = {
    descricao: req.body.descricao,
    fornecedor: req.body.fornecedor,
    precocusto: req.body.precocusto,
    precovenda: req.body.precovenda,
  };
  Product.findOneAndUpdate(filter, update, { upsert: true }, function (
    err,
    doc
  ) {
    if (err) return res.send(500, { error: err });
    return res.send("Succesfully saved.");
  });
});

app.delete("/api/contasapagar/delete/:_id", function (req, res) {
  var id = req.params._id;
  Contasapagar.deleteOne({ _id: id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
    return res.send("Succesfully deleted.");
  });
});

app.delete("/api/produtos/delete/:_id", function (req, res) {
  var id = req.params._id;
  Product.deleteOne({ _id: id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
    return res.send("Succesfully deleted.");
  });
});

app.get("/api/contasapagar/create/:_id", function (req, res) {
  var id = req.params._id;
  Contasapagar.findOne({ _id: id }, function (err, collection) {
    res.json(collection);
  });
});

app.get("/api/produtos/create/:_id", function (req, res) {
  var id = req.params._id;
  Product.findOne({ _id: id }, function (err, collection) {
    res.json(collection);
  });
});

app.get("/api/produtos", function (req, res) {
  Product.find({}, function (err, collection) {
    res.json(collection);
  });
});

app.get("/api/contasapagar", function (req, res) {
  Contasapagar.find({}, function (err, collection) {
    res.json(collection);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT);
console.log("Server running on port 3000 http://localhost:3000/");
