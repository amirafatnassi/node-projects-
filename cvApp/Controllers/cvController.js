const cvs = require("../models/cv");

exports.getCvs = async (req, res) => {
  try {
    const result = await cvs.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getCv = async (req, res) => {
  try {
    const cv = await cvs.findById(req.params.id).populate('competences').populate('langues').populate('interets').populate('experiences').populate('formations');
    if (cv) {
      res.status(200).send(cv);
    } else {
      res.status(401).send("cv not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addCv = async (req, res) => {
  try {
    const cv = await cvs.create(req.body);
    res.status(200).send(cv);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateCv = async (req, res) => {
  try {
    await cvs.findByIdAndUpdate(req.params.id, req.body);
    const updatedCv = await cvs.findById(req.params.id);
    res.status(200).send(updatedCv);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteCv = async (req, res) => {
  try {
    const deletedCv = await cvs.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedCv);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.affectFormationToCv = async (req, res) => {
  try {
    const _cv = await cvs.findByIdAndUpdate(req.params.cvId, {
      $push: { formations: req.params.formationId },
    });
    const _updatedCv= await cvs.findById(req.params.cvId);
    res.status(200).send(_updatedCv);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};


exports.affectCompetenceToCv = async (req, res) => {
  try {
    const _cv = await cvs.findByIdAndUpdate(req.params.cvId, {
      $push: { competences: req.params.competenceId },
    });
    const _updatedCv= await cvs.findById(req.params.cvId);
    res.status(200).send(_updatedCv);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};


exports.affectInteretToCv = async (req, res) => {
  try {
    const _cv = await cvs.findByIdAndUpdate(req.params.cvId, {
      $push: { interets: req.params.interetId },
    });
    const _updatedCv= await cvs.findById(req.params.cvId);
    res.status(200).send(_updatedCv);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};



exports.affectLangueToCv = async (req, res) => {
  try {
    const _cv = await cvs.findByIdAndUpdate(req.params.cvId, {
      $push: { langues: req.params.langueId },
    });
    const _updatedCv= await cvs.findById(req.params.cvId);
    res.status(200).send(_updatedCv);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};


exports.affectExperienceToCv = async (req, res) => {
  try {
    const _cv = await cvs.findByIdAndUpdate(req.params.cvId, {
      $push: { experiences: req.params.experienceId },
    });
    const _updatedCv= await cvs.findById(req.params.cvId);
    res.status(200).send(_updatedCv);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};