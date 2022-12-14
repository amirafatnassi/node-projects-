const fileModel = require("../models/file");

exports.uploadSingleFile = async (req, res) => {
  try {
    if (req.file) {
      await fileModel.create(req.body);
      res.status(200).send({ message: "file uploaded successfully" });
    } else {
      res.status(400).send({ message: "file not allowed !" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.uploadMultipleFiles = async (req, res) => {
  try {
    await fileModel.create(req.body);
    res.send({ message: "files uploaded !" });
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};
