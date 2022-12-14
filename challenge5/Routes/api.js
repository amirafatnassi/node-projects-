const express = require("express");
const { uploadSingleFile, uploadMultipleFiles } = require("../Controllers/fileController");
const upload = require("../Middlewares/upload");
const router = express.Router();

router.post("/upload-single", upload.single("image"),uploadSingleFile);

router.post("/upload-multiple", upload.array("image", 3),uploadMultipleFiles );

module.exports = router;