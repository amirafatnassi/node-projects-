const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/RHgo")
  .then(() => {
    console.log("db working");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.Promise = global.Promise;