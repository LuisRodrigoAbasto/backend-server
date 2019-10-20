// Requires
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// inicializar Variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importar Rutas
var appRoutes = require("./routes/app");
var usuarioRoutes = require("./routes/usuario");

// conexion a la Base de DAtos
mongoose.connection.openUri(
  "mongodb://localhost:27017/hospitalDB",
  (err, res) => {
    if (err) throw err;
    console.log("Base de Datos 3000: \x1b[32m%s\x1b[0m", " online");
  }
);

// Rutas
app.use("/usuario", usuarioRoutes);
app.use("/", appRoutes);

// escuchar Peticiones
app.listen(3000, () => {
  console.log("Express Server puerto 3000: \x1b[32m%s\x1b[0m", " online");
});
