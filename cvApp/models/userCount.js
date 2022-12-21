const mongoose = require("mongoose");
const userCount = new mongoose.Schema(
  {
    users: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports=mongoose.model('UserCount',userCount,'UserCount');
