var express = require("express");

// inicializar Variables
var app = express();
var Usuario = require("../models/usuario");

//=============================================
// Obtenes todo los Usuarios
//=============================================
app.get("/", (req, res, next) => {
  Usuario.find({}, "nombre email role ").exec((err, usuarios) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error Cargando Usuario",
        errors: err
      });
    }
    res.status(200).json({
      ok: true,
      usuarios: usuarios
    });
  });
});

app.post("/", (req, res) => {
  var body = req.body;

  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    img: body.img,
    role: body.role
  });
  usuario.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al Crear Usuario",
        errors: err
      });
    }
    res.status(201).json({
      ok: true,
      usuario: usuarioGuardado
    });
  });
});

module.exports = app;
