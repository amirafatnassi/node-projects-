const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create file schema &model
const FileSchema = new Schema(
  {
    image: [{
      type: Buffer,
    }],
    path: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const File = mongoose.model("File", FileSchema);
module.exports = File;
