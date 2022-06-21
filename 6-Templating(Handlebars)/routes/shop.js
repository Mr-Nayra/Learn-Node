const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    products: products,
    hasProducts: products.length > 0,
    pageTitle: "Shop",
    path: "/admin/shop",
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
