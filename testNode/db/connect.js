const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/testgo")
  .then(() => {
    console.log("database is working !");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.Promise = global.Promise;