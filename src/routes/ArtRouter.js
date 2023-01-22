// ART ROUTES

const express = require("express");
const ArtModel = require("../models/ArtModel");

const ArtRouter = express.Router();

const apiUrl = "http://localhost:4000";

// GET ALL ART

ArtRouter.get("/get-art", async (req, res) => {
  const art = await ArtModel.find();

  res.status(200).send(art);
});

// GET SINGLE ARTWORK

ArtRouter.get("/single-art/:id", async (req, res) => {
  const artwork = await ArtModel.findById(req.params.id).lean();

  res.status(200).send(artwork);
});

// ADD NEW ARTWORK

ArtRouter.post("/add-art", async (req, res) => {
  let newArt;

  const uploadPath = __dirname + "../../../public/uploads/art/";

  const image = req.files.imgSrc;
  await image.mv(uploadPath + image.name);

  if (req.files.altImgSrc) {
    const altImage = req.files.altImgSrc;
    await altImage.mv(uploadPath + altImage.name);

    newArt = new ArtModel({
      name: req.body.name,
      imgSrc: apiUrl + "/uploads/art/" + image.name,
      altName: req.body.altName,
      altImgSrc: apiUrl + "/uploads/art/" + altImage.name,
    });
  } else {
    newArt = new ArtModel({
      name: req.body.name,
      imgSrc: apiUrl + "/uploads/art/" + image.name,
    });
  }

  await newArt.save();

  res.redirect("http://localhost:3000/admin");
});

// DELETE SELECTED ARTWORK

ArtRouter.post("/delete/:id", async (req, res) => {
  await ArtModel.findByIdAndDelete(req.params.id).lean();

  res.redirect("http://localhost:3000/admin");
});

module.exports = ArtRouter;
