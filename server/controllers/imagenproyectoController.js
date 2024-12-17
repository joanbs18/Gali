const ImagenProyecto = require("../models/imagenproyecto");



async function createImagenProyecto(req, res) {
  const { idproyecto, descripcion } = req.body;
  console.log(req.body);
  const imagenPath = req.file ? `/img/${req.file.filename}` : null; // Guardamos solo la ruta de la imagen
  try {
    const result = await ImagenProyecto.createImagenProyecto(
      idproyecto,
      imagenPath,
      descripcion,
     
    );
    res.status(201).json({ message: "Proyecto creado", result });
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    res.status(500).json({ message: "Error al crear el proyecto" });
  }
}

// Controlador para obtener un proyecto con sus imágenes
async function getSubProyectos(req, res) {

  try {
    // Llamamos a la función del modelo para obtener el proyecto con sus imágenes
    const proyectoConImagenes = await ImagenProyecto.getSubProyectos( );

    if (!proyectoConImagenes || proyectoConImagenes.length === 0) {
      return res
        .status(404)
        .json({ message: "Proyecto no encontrado o sin imágenes" });
    }


    res
      .status(200)
      .json({
        message: `Proyecto y sus imágenes obtenidas`,
        proyecto: proyectoConImagenes,
      });
  } catch (error) {
    console.error("Error al obtener proyecto con imágenes:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el proyecto con imágenes" });
  }
}

// Controlador para obtener un proyecto con sus imágenes
async function obtenerProyectoConImagenes(req, res) {
  const { idproyecto } = req.params;
  try {
    // Llamamos a la función del modelo para obtener el proyecto con sus imágenes
    const proyectoConImagenes = await ImagenProyecto.getProyectoWithImagenes(
      idproyecto
    );

    if (!proyectoConImagenes || proyectoConImagenes.length === 0) {
      return res
        .status(404)
        .json({ message: "Proyecto no encontrado o sin imágenes" });
    }

    // Convertir las imágenes de BLOB a base64
    const proyectoConImagenesBase64 = proyectoConImagenes.map((proyecto) => {
      return {
        ...proyecto,
        imagen: proyecto.imagen ? proyecto.imagen.toString("base64") : null, // Para las imágenes asociadas
      };
    });

    res
      .status(200)
      .json({
        message: `Proyecto con ID ${idproyecto} y sus imágenes obtenidas`,
        proyecto: proyectoConImagenesBase64,
      });
  } catch (error) {
    console.error("Error al obtener proyecto con imágenes:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el proyecto con imágenes" });
  }
}

// Controlador para obtener todas las imágenes asociadas a un proyecto por ID de proyecto
function getImagenesByProyecto(req, res) {
  const { idproyecto } = req.params;

  ImagenProyecto.getImagenesByProyecto(idproyecto, (results) => {
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron imágenes para este proyecto" });
    }
  });
}

// Controlador para actualizar una imagen asociada a un proyecto
function updateImagenProyecto(req, res) {
  const { idimagenproyecto } = req.params;
  const { descripcion } = req.body;
  const imagen = req.file ? req.file.buffer : null; // Usamos multer para cargar la nueva imagen

  if (!imagen) {
    return res.status(400).json({ message: "No se ha cargado ninguna imagen" });
  }

  ImagenProyecto.updateImagenProyecto(
    idimagenproyecto,
    imagen,
    descripcion,
    (result) => {
      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Imagen del proyecto actualizada", result });
      } else {
        res.status(404).json({ message: "Imagen no encontrada" });
      }
    }
  );
}

// Controlador para eliminar una imagen asociada a un proyecto
function deleteImagenProyecto(req, res) {
  const { idimagenproyecto } = req.params;

  ImagenProyecto.deleteImagenProyecto(idimagenproyecto, (result) => {
    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Imagen del proyecto eliminada", result });
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  });
}

module.exports = {
  createImagenProyecto,
  getImagenesByProyecto,
  updateImagenProyecto,
  deleteImagenProyecto,
  obtenerProyectoConImagenes,
  getSubProyectos,
};
