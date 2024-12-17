const express = require("express");
const cors = require("cors");
const multer = require("multer"); // Agregamos multer para manejar archivos
require("dotenv").config();
const MySQLConnection = require("./config/mysql");
const cookieParser = require("cookie-parser");
const path = require("path");

// Configuración de multer para almacenar los archivos en la memoria
const storage = multer.memoryStorage(); // Para almacenar en memoria y usar como blob
const upload = multer({ storage: storage }); // Middleware de multer

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APIPORT;

    this.proyectoPath = "/api/proyecto";
    this.proyectosPath = "/api/proyectos";
    this.usuarioPath = "/api/ingresar";

    this.middlewares();
    this.routes();
    this.mySQLDBConect(); // Llama a la función de conexión a la base de datos
  }

  // Método que establece las rutas de la API
  routes() {
    // Rutas públicas (login, register) que no necesitan token
    this.app.use(this.usuarioPath, require("./routes/authRoute"));

    // Rutas protegidas que requieren autenticación
    this.app.use(this.proyectoPath, require("./routes/proyectoRoutes"));
    this.app.use(this.proyectosPath, require("./routes/imagenProyectoRoutes"));
  }

  // Funciones que tiene el express y que me permite usarlas reutilizando código
  middlewares() {
    this.app.use("/public", (req, res, next) => {
      // Verifica si la URL solicitada es proyectos.html
      console.log(req);
      if (req.url === "/proyectos.html") {
        return res.status(403).send("Acceso prohibido");
      }
      next(); // Si no es proyectos.html, continua con la siguiente capa
    });
    this.app.use(cors());
    // Habilitar el parseo de los datos del body
    this.app.use(express.json());
    this.app.use(cookieParser()); // Para manejar cookies en las peticiones
  }

  listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`El servidor está corriendo en el puerto: ${this.port}`);
    });
  }

  mySQLDBConect() {
    MySQLConnection(); // Asegúrate de que esta función establezca la conexión
  }
}

module.exports = Server;
