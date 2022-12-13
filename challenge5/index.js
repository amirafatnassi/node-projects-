const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const maxSize = 1 * 1000 * 1000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
}).single("mypic");

app.get("/", function (req, res) {
  res.render("Signup");
});

app.post("/uploadProfilePicture", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Success, Image uploaded!");
    }
  });
});

app.listen(4000, function (error) {
  if (error) throw error;
  console.log("Server created Successfully");
});
