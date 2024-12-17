const express = require("express");
const router = express.Router();
const multer = require("multer");
const imagenProyectoController = require("../controllers/imagenproyectoController");
const verifyToken = require("../middlewares/verifyToken");

const path = require("path");

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

// Ruta para crear una nueva imagen en un proyecto (con Multer para manejar la carga de la imagen)
router.post(
  "/",
  upload.single("imagen"),
  imagenProyectoController.createImagenProyecto
);



// Ruta para obtener todas las imágenes de un proyecto
router.get("/", imagenProyectoController.getSubProyectos);
router.get("/:idproyecto", imagenProyectoController.getImagenesByProyecto);

// Ruta para obtener un proyecto con sus imágenes
router.get(
  "/proyectos/:idproyecto",
  imagenProyectoController.obtenerProyectoConImagenes
);

// Ruta para actualizar una imagen específica en un proyecto (con Multer para manejar la carga de la imagen)
router.put(
  "/:idimagenproyecto",verifyToken,
  upload.single("imagen"),
  imagenProyectoController.updateImagenProyecto
);

// Ruta para eliminar una imagen específica
router.delete(
  "/:idimagenproyecto",verifyToken,
  imagenProyectoController.deleteImagenProyecto
);

module.exports = router;
