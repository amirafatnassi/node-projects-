const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/cryptogo")
  .then(() => {
    console.log("database working");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.Promise = global.Promise;