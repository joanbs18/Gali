const express = require("express");
const router = express.Router();
const multer = require("multer");
const proyectoController = require("../controllers/proyectoController");
const path = require("path");
const verifyToken = require("../middlewares/verifyToken");

// Configuración de Multer para almacenar las imágenes en la carpeta 'public/img'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Apuntar a la carpeta 'public/img' en la raíz del proyecto
    cb(null, path.join(__dirname, "../..", "public", "img")); // Subimos dos directorios hacia la raíz
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // nombre único para cada archivo
  },
});

const upload = multer({ storage: storage });

// Ruta para crear un nuevo proyecto con imagen
router.post("/",verifyToken, upload.single("imagen"), proyectoController.crearProyecto);

// Otras rutas
router.get("/", proyectoController.obtenerProyectos);
router.get("/:idproyecto", proyectoController.obtenerProyectoPorId);
router.put(
  "/:idproyecto",verifyToken,
  upload.single("imagen"),
  proyectoController.actualizarProyecto
);
router.delete("/:idproyecto",verifyToken, proyectoController.eliminarProyecto);

module.exports = router;
