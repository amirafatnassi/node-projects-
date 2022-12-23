const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const jwt = require("jsonwebtoken");
const clients=require('../models/client');

passport.use(
  new BearerStrategy(function (token, done) {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    clients.findOne({ _id: decoded.clientId }, function (err, client) {
      if (err) {
        return done(err);
      }
      if (!client) {
        return done(null, false);
      }
      return done(null, client, { scope: "all" });
    });
  })
);
