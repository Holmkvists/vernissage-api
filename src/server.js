// IMPORTS

require("dotenv").config();
require("./database/mongoose");

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

// ROUTERS

const ShopRouter = require("./routes/ShopRouter");
const ArtRouter = require("./routes/ArtRouter");

// SERVER SETUP

const server = express();

server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.use(express.static("public"));
server.use(fileUpload());

server.get("/", (req, res) => {
  res.send("Server running");
});

// ROUTES

server.use("/shop", ShopRouter);
server.use("/art", ArtRouter);

// LOGIN

server.post("/authorize", (req, res) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    res.status(200).send("Authorized");
  }
});

// HOSTING

const port = 4000;
const apiUrl = "http://localhost:4000";

server.listen(port, () => console.log(`Runs at ${apiUrl}`));
