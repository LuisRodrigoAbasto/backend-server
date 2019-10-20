var express = require("express");

// inicializar Variables
var app = express();

app.get("/", (req, res, next) => {
  res.status(200).json({
    ok: true,
    mensaje: "Peticion Realizada Correctamente"
  });
});

module.exports = app;
