const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
  // dirname gives the path of the file in which the file is currently in
});

router.post("/add-product", (req, res) => {
  //makes the middleware to trigger only for post request
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
