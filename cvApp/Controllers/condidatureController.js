const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const condidatures = require("../models/condidature");
const cvs = require("../models/cv");

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
    
    const _cv = await cvs.findById(req.body.cv).populate('competences');
    const _offre = await cvs.findById(req.body.offreTravail);
    const html = fs.readFileSync("Views/resume.html", "utf-8");
    let tab = '';
    _cv.competences.map((e)=>{
      return tab+=`
      <html>
       ${e.competence},
       niveau: ${e.niveau},</html> `
    });
      
        
      
    const render = ejs.render(html, {
      fullname: _cv.prenom + " " + _cv.nom,
      jobTitle:_cv.jobTitle,
      email:_cv.email,
      tel:_cv.tel,
      profile: _cv.profile,
      competences:tab
     
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
      from: req.body.email,
      to: process.env.EMAIL,
      subject: req.body.email + ":" + req.body.subject,
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
