const clients = require("../models/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const result = await clients.findOne({ email: req.body.email });
    console.log(result);
    if (result) {
      res.status(400).send({ message: "email déjà existant !" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      clients.create(req.body);
      res.status(201).send({ message: "client created successfully !" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await clients.findOne({ email: req.body.email });
    if (!result) {
      res.status(400).send({ message: "email n'existe pas !" });
    } else {
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (checkPassword) {
        const data = { clientId: result._id, clientEmail: result.email };
        const token = jwt.sign(data, process.env.JWTKEY, { expiresIn: "1h" });
        res.send({ token });
      } else {
        res.status(400).send({ message: "password don't match" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};



exports.getClients = async (req, res) => {
  try {
    const data = await clients.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.updateClient = async (req, res) => {
  try {
    await clients.findByIdAndUpdate(req.params.id, req.body);
    const updatedClient = await clients.findById(req.params.id);
    res.status(200).send(updatedClient);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await clients.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.status(200).send(deletedClient);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};

