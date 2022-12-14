const multer = require("multer");
const path=require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix+path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const extension=path.extname(file.originalname);
  cb(null,allowedExtensions.includes(extension));
}

const upload = multer({ storage: storage ,fileFilter:fileFilter});
module.exports=upload;
