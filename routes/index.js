var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var novedadesModel = require("./../models/novedadesModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  var novedades = novedades.splice(0.5);
  res.render("index", {
    novedades,
  });
});

router.post("/", async (req, res, next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: "caceresyreparacion@gmail.com",
    subject: "Contacto desde la web LER",
    html:
      nombre +
      " se contactó desde la web y quiere mas información a este correo: " +
      email +
      ". <br> Ademas, hizo este comentario: " +
      mensaje +
      ". <br> Su tel es: " +
      tel,
  };

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  var info = await transporter.sendMail(obj);

  res.render("index", {
    message: "Mensaje enviado correctamente!!",
  });
});
module.exports = router;
