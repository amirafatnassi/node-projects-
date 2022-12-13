const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create email schema & model
const MailSchema = new Schema(
  {
    subject: {
      type: String,
      required: [true, "subject field is required!"],
    },
    text: {
      type: String,
      required: [true, "text field is required!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Email = mongoose.model("Email", MailSchema);
module.exports = Email;
