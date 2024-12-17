const {
  createProyecto,
  getAllProyectos,
  getProyectoById,
  updateProyecto,
  deleteProyecto,
  getProyectoWithImagenes,
} = require("../models/proyecto");

// Controlador para crear un nuevo proyecto
// Controlador para crear un nuevo proyecto
async function crearProyecto(req, res) {
  const { nombre, descripcion, equipo } = req.body;
  const imagenPath = req.file ? `/img/${req.file.filename}` : null; // Guardamos solo la ruta de la imagen
  try {
    const result = await createProyecto(
      nombre,
      descripcion,
      equipo,
      imagenPath
    );
    res.status(201).json({ message: "Proyecto creado", result });
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    res.status(500).json({ message: "Error al crear el proyecto" });
  }
}

// Controlador para obtener todos los proyectos
async function obtenerProyectos(req, res) {
  try {
    // Obtén la página y el límite desde los parámetros de consulta
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 8; // Límite de proyectos por página, por defecto 3

    // Llama a getAllProyectos pasándole los valores de page y limit
    const proyectos = await getAllProyectos(page, limit);

    res.status(200).json({
      message: "Proyectos obtenidos",
      proyectos: proyectos,
    });
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
}

// Controlador para obtener un proyecto por ID
async function obtenerProyectoPorId(req, res) {
  const { idproyecto } = req.params;
  try {
    const proyecto = await getProyectoById(idproyecto);

    if (!proyecto || proyecto.length === 0) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json({
      message: "Proyectos obtenidos",
      proyectos: proyecto,
    });
  } catch (error) {
    console.error("Error al obtener proyecto:", error);
    res.status(500).json({ message: "Error al obtener el proyecto" });
  }
}

// Controlador para actualizar un proyecto
async function actualizarProyecto(req, res) {
  const { idproyecto } = req.params;
  const { nombre, descripcion, equipo } = req.body;
  const imagenPath = req.file ? `/img/${req.file.filename}` : null;

  try {
    const result = await updateProyecto(
      idproyecto,
      nombre,
      descripcion,
      equipo,
      imagenPath
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json({ message: "Proyecto actualizado" });
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);
    res.status(500).json({ message: "Error al actualizar el proyecto" });
  }
}
// Controlador para eliminar un proyecto
async function eliminarProyecto(req, res) {
  const { idproyecto } = req.params;
  try {
    const result = await deleteProyecto(idproyecto);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json({ message: "Proyecto eliminado" });
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    res.status(500).json({ message: "Error al eliminar el proyecto" });
  }
}

module.exports = {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  actualizarProyecto,
  eliminarProyecto,
};
