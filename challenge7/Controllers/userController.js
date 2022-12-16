const users = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const result = await users.findOne({ email: req.body.email });
    if (result) {
      res.status(400).send("email déjà existant");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      users.create(req.body);

      res.status(201).send("user created successfully !");
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await users.findOne({ email: req.body.email });
    if (!result) {
      res.status(400).send("email not found !");
    } else {
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (checkPassword) {
        const payload = { userId: result._id };
        const token = jwt.sign(payload, process.env.JWTKEY);
        res.status(200).send({ message: "login successfully", token: token });
      } else {
        res.status(400).send("passwords don't match !");
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};