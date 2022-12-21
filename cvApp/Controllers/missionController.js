const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const experiences = require("../models/experience");

exports.getExperiences = async (req, res) => {
  try {
    const result = await experiences.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getExperience = async (req, res) => {
  try {
    const experience = await experiences.findById(req.params.id);
    if (experience) {
      res.status(200).send(experience);
    } else {
      res.status(401).send("experience not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addExperience = async (req, res) => {
  try {
    const experience = await experiences.create(req.body);
    res.status(200).send(experience);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateExperience = async (req, res) => {
  try {
    await experiences.findByIdAndUpdate(req.params.id, req.body);
    const updatedExperience = await experiences.findById(req.params.id);
    res.status(200).send(updatedExperience);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteMission = async (req, res) => {
  try {
    const deletedMission = await experiences.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedMission);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.affectEmployeeToMission = async (req, res) => {
  try {
    const _employee = await employees.findById(req.params.idEmployee)
    if (_employee.disponibilite == true) {
      await experiences.findByIdAndUpdate(req.params.idMission, {
        $push: { equipe: req.params.idEmployee },
      });
      const updatedExperience = await experiences.findById(req.params.idMission).populate("equipe");
      const _employee = await employees.findByIdAndUpdate(
        req.params.idEmployee,
        {
          disponibilite: false,
        }
      );

      const html = fs.readFileSync("Views/email.html", "utf-8");
      const render = ejs.render(html, {
        employeeFullname: _employee.prenom + " " + _employee.nom,
        mission:updatedExperience._id,
        tache:updatedExperience.tache,
        description:updatedExperience.description,
        dateDebut:updatedExperience.dateDebut,
        dateFin:updatedExperience.dateFin,
        equipe:updatedExperience.equipe
      });

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: req.body.email,
        to: process.env.EMAIL,
        subject: req.body.email + ":" + req.body.subject,
        html: render,
        //html:``
      });

      res.status(200).send(updatedExperience);
    } else {
      res.status(400).send({ message: "employee n'est pas disponible" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};

exports.deleteEmployeeFromExperience = async (req, res) => {
  try {
    await experiences.findByIdAndUpdate(req.params.idExperience, {
      $pull: { equipe: req.params.idEmployee },
    });
    const updatedExperience = await experiences.findById(req.params.idExperience);
    const _employee = await employees.findByIdAndUpdate(req.params.idEmployee, {
      disponibilite: true,
    });

    res.status(200).send(updatedExperience);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};
