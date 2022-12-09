const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const app = express();



app.get("/", function (req, res) {
  res.send("hello world");
});



app.listen(4000, function () {
  console.log("okkkkk");
});
