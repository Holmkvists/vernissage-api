const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  imgSrc: { type: String, required: true },
  sizes: [{ type: String, required: false }],
  price: { type: String, required: true },
  material: { type: String, required: false },
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
