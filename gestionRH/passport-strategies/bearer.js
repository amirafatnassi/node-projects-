const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const jwt = require("jsonwebtoken");
const Admin=require('../models/admin');

passport.use(
  new BearerStrategy(function (token, done) {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    Admin.findOne({ _id: decoded.adminId }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: "all" });
    });
  })
);
