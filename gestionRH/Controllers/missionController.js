const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const missions = require("../models/mission");
const employees = require("../models/employee");

exports.getMissions = async (req, res) => {
  try {
    const result = await missions.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getMission = async (req, res) => {
  try {
    const mission = await missions.findById(req.params.id);
    if (mission) {
      res.status(200).send(mission);
    } else {
      res.status(401).send("mission not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addMission = async (req, res) => {
  try {
    const mission = await missions.create(req.body);
    res.status(200).send(mission);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateMission = async (req, res) => {
  try {
    await missions.findByIdAndUpdate(req.params.id, req.body);
    const updatedMission = await missions.findById(req.params.id);
    res.status(200).send(updatedMission);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteMission = async (req, res) => {
  try {
    const deletedMission = await missions.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedMission);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.affectEmployeeToMission = async (req, res) => {
  try {
    const _employee = await employees.findById(req.params.idEmployee)
    if (_employee.disponibilite == true) {
      await missions.findByIdAndUpdate(req.params.idMission, {
        $push: { equipe: req.params.idEmployee },
      });
      const updatedMission = await missions.findById(req.params.idMission).populate("equipe");
      const _employee = await employees.findByIdAndUpdate(
        req.params.idEmployee,
        {
          disponibilite: false,
        }
      );

      const html = fs.readFileSync("Views/email.html", "utf-8");
      const render = ejs.render(html, {
        employeeFullname: _employee.prenom + " " + _employee.nom,
        mission:updatedMission._id,
        tache:updatedMission.tache,
        description:updatedMission.description,
        dateDebut:updatedMission.dateDebut,
        dateFin:updatedMission.dateFin,
        equipe:updatedMission.equipe
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

      res.status(200).send(updatedMission);
    } else {
      res.status(400).send({ message: "employee n'est pas disponible" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};

exports.deleteEmployeeFromMission = async (req, res) => {
  try {
    await missions.findByIdAndUpdate(req.params.idMission, {
      $pull: { equipe: req.params.idEmployee },
    });
    const updatedMission = await missions.findById(req.params.idMission);
    const _employee = await employees.findByIdAndUpdate(req.params.idEmployee, {
      disponibilite: true,
    });

    res.status(200).send(updatedMission);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};
