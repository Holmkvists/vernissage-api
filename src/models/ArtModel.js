const mongoose = require("mongoose");

const artSchema = mongoose.Schema({
  name: { type: String, required: true },
  imgSrc: { type: String, required: true },
  altImgSrc: { type: String, required: false },
  altName: { type: String, required: false },
});

const ArtModel = mongoose.model("art", artSchema);

module.exports = ArtModel;
