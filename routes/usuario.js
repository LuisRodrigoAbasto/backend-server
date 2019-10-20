var express = require("express");
const bcrypt = require("bcryptjs");
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
//=============================================
// Actualizar usuario
//=============================================
app.put("/:id", (req, res) => {
  var id = req.params.id;
  var body = req.body;
  Usuario.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al Buscar Usuario",
        errors: err
      });
    }
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: "El usuario con el id " + id + " no existe",
        errors: { message: "No exite un Usuario con ese ID" }
      });
    }

    usuario.nombre = body.nombre;
    usuario.email = body.email;
    usuario.role = body.role;

    usuario.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al Actualizar Usuario",
          errors: err
        });
      }
      usuarioGuardado.password = ":)";
      res.status(201).json({
        ok: true,
        usuario: usuarioGuardado
      });
    });
  });
});

//=============================================
// Crear usuario
//=============================================
app.post("/", (req, res) => {
  var body = req.body;

  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    role: body.role
  });
  usuario.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(400).json({
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
//=============================================
// Eliminar Usuario por el id
//=============================================
app.delete('/:id',(req,res)=>{
  var id=req.params.id;
  Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error borrar Usuario",
        errors: err
      });
    }
    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No Existe un Usuario con ese id",
        errors: {message:'No Existe un Usuario con ese id'}
      });
    }
    res.status(200).json({
      ok: true,
      usuario: usuarioBorrado
    });
  })
})

module.exports = app;
