const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const condidatures = require("../models/condidature");
const cvs = require("../models/cv");
const offres=require('../models/offreTravail');

exports.getcondidatures = async (req, res) => {
  try {
    const result = await condidatures.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getCondidature = async (req, res) => {
  try {
    const condidature = await condidatures.findById(req.params.id);
    if (condidature) {
      res.status(200).send(condidature);
    } else {
      res.status(401).send("condidature not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.postuler = async (req, res) => {
  try {
    const condidature = await condidatures.create(req.body);
    
    const _cv = await cvs.findById(req.body.cv).populate('competences').populate('formations').populate('interets').populate('langues').populate('experiences');
    const _offre = await offres.findById(req.body.offreTravail);
    const html = fs.readFileSync("Views/resume.html", "utf-8");
    let tab_competences = '';
    let tab_formations = '';
    let tab_interets = '';
    let tab_langues = '';
    let tab_experiences = '';
    _cv.competences.map((e)=>{
      return tab_competences+= 
      ` ${e.competence} ,
       niveau: ${e.niveau} `
    });
      
    _cv.formations.map((e)=>{
      let newDebutDateFormat = e.dateDebut.getDate()+'/'+(e.dateDebut.getMonth()+1)+'/'+e.dateDebut.getFullYear();
      let newFinDateFormat = e.dateFin.getDate()+'/'+(e.dateFin.getMonth()+1)+'/'+e.dateFin.getFullYear();
      return  tab_formations+=` ${e.formation}: ${e.description}, ${newDebutDateFormat} à ${newFinDateFormat} `
    });

    _cv.experiences.map((e)=>{
      let newDebutDateFormat = e.dateDebut.getDate()+'/'+(e.dateDebut.getMonth()+1)+'/'+e.dateDebut.getFullYear();
      let newFinDateFormat = e.dateFin.getDate()+'/'+(e.dateFin.getMonth()+1)+'/'+e.dateFin.getFullYear();
      return tab_experiences+=` ${e.poste} , ${e.description},  ${newDebutDateFormat} , ${newFinDateFormat} `
    });

    _cv.interets.map((i)=>{
      return tab_interets+=` ${i.interet} `
    });

    _cv.langues.map((e)=>{
      return tab_langues+=` ${e.langue}, niveau: ${e.niveau} `
    });

      
    const render = ejs.render(html, {
      fullname: _cv.prenom + " " + _cv.nom,
      jobTitle:_cv.jobTitle,
      email:_cv.email,
      tel:_cv.tel,
      profile: _cv.profile,
      competences:tab_competences,
      interets:tab_interets,
      langues:tab_langues,
      formations:tab_formations,
      experiences:tab_experiences
     
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      //port: 587,
    //  secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: _cv.email,
      to: process.env.EMAIL,
      subject: 'Condidature pour:' + _offre.jobTitle,
      html: render
    });
    res.status(200).send(condidature);
  } catch (error) {
    res.status(500).send({message: error.message || "erreur serveur"});
  }
};

exports.updateCondidature = async (req, res) => {
  try {
    await condidatures.findByIdAndUpdate(req.params.id, req.body);
    const updatedCondidature = await condidatures.findById(req.params.id);
    res.status(200).send(updatedCondidature);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteCondidature = async (req, res) => {
  try {
    const deletedCondidature = await condidatures.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(deletedCondidature);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
