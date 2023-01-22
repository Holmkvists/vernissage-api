// PRODUCT ROUTES

const express = require("express");
const ProductModel = require("../models/ProductModel");

const ShopRouter = express.Router();

const apiUrl = "http://localhost:4000";

// GET ALL PRODUCTS

ShopRouter.get("/get-products", async (req, res) => {
  const products = await ProductModel.find();

  res.status(200).send(products);
  return;
});

// GET SINGLE PRODUCT

ShopRouter.get("/single-product/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id).lean();

  res.status(200).send(product);
});

// ADD NEW PRODUCT

ShopRouter.post("/add-product", async (req, res) => {
  let newProduct;

  const uploadPath = __dirname + "../../../public/uploads/products/";

  const image = req.files.imgSrc;
  await image.mv(uploadPath + image.name);

  newProduct = new ProductModel({
    name: req.body.name,
    imgSrc: apiUrl + "/uploads/products/" + image.name,
    sizes: ["S", "M", "L", "XL"],
    price: req.body.price,
    material: req.body.material,
  });

  await newProduct.save();

  res.redirect("http://localhost:3000/admin");
});

// DELETE SELECTED PRODUCT

ShopRouter.post("/delete/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id).lean();

  res.redirect("http://localhost:3000/admin");
});

module.exports = ShopRouter;
