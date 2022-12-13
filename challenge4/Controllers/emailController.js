const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");

exports.emailWithText = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      //service:"gmail"
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.email, // sender address
      to: process.env.EMAIL, // list of receivers
      subject: req.body.email + ":" + req.body.subject, // Subject line
      //text: req.body.text, // plain text body
      html: `<h1>titreeeee</h1>
      <p>${req.body.html}</p>`, // plain text body
    });
    res.status(200).send({ message: "email sent" });
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.emailWithEjs = async (req, res) => {
  try {
    const html = fs.readFileSync("Views/mail.html", "utf-8");
    console.log(html);
    const render = ejs.render(html, {
      fullname: req.body.firstName + " " + req.body.lastName,
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      //service:"gmail"
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.email, // sender address
      to: process.env.EMAIL, // list of receivers
      subject: req.body.email + ":" + req.body.subject, // Subject line
      //text: req.body.text, // plain text body
      html: render, // plain text body
    });
    res.status(200).send({ message: "email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).send("erreur serveur");
  }
};

exports.emailWithAttachments = async (req, res) => {
  try {
    const html = fs.readFileSync("Views/mail.html", "utf-8");
    console.log(html);
    const render = ejs.render(html, {
      fullname: req.body.firstName + " " + req.body.lastName,
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      //service:"gmail"
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.email, // sender address
      to: process.env.EMAIL, // list of receivers
      subject: req.body.email + ":" + req.body.subject, // Subject line
      //text: req.body.text, // plain text body
      html: render, // plain text body
      attachments: [
        {
          // utf-8 string as an attachment
          filename: "text1.txt",
          content: "hello world!",
        },
        {
          // stream as an attachment
          filename: "text4.txt",
          content: fs.createReadStream("attachments/file.txt"),
        },
        {
          // define custom content type for the attachment
          filename: "text.bin",
          content: "hello world!",
          contentType: "text/plain",
        },
        {
          // use URL as an attachment
          filename: "license.txt",
          path: "https://raw.github.com/nodemailer/nodemailer/master/LICENSE",
        },
        {
          // encoded string as an attachment
          filename: "text1.txt",
          content: "aGVsbG8gd29ybGQh",
          encoding: "base64",
        },
        {
          // data uri as an attachment
          path: "data:text/plain;base64,aGVsbG8gd29ybGQ=",
        },
      ],
    });
    res.status(200).send({ message: "email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).send("erreur serveur");
  }
};
