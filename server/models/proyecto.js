const MySQLConnection = require("../config/mysql"); // Importa la conexión

// Función para crear un nuevo proyecto
async function createProyecto(nombre, descripcion, equipo, imagen) {
  const sql =
    "INSERT INTO proyecto (nombre, descripcion, equipo, imagen) VALUES (?, ?, ?, ?)";
  const connection = await MySQLConnection(); // Obtener la conexión
  console.log("welite");
  try {
    const [result] = await connection.execute(sql, [
      nombre,
      descripcion,
      equipo,
      imagen,
    ]);
    return result;
  } catch (err) {
    console.error("Error al crear proyecto:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

// Función para obtener todos los proyectos
async function getAllProyectos() {
  const sql = `SELECT * FROM proyecto`;
  const connection = await MySQLConnection();

  try {
    const [results] = await connection.execute(sql);
    return results;
  } catch (err) {
    console.error("Error al obtener proyectos:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

// Función para obtener un proyecto por ID
async function getProyectoById(idproyecto) {
  const sql = "SELECT * FROM proyecto WHERE idproyecto = ?";
  const connection = await MySQLConnection(); // Obtener la conexión

  try {
    const [result] = await connection.execute(sql, [idproyecto]);
    return result;
  } catch (err) {
    console.error("Error al obtener proyecto:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

// Función para actualizar un proyecto
async function updateProyecto(idproyecto, nombre, descripcion, equipo, imagen) {

    const sql = "call actualizarProyecto(?,?,?,?,?)";

  const connection = await MySQLConnection(); // Obtener la conexión

  try {
    const [result] = await connection.execute(sql, [
      idproyecto,
      nombre,
      descripcion,
      equipo,
      imagen,
     
    ]);
    return result;
  } catch (err) {
    console.error("Error al actualizar proyecto:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

// Función para eliminar un proyecto
async function deleteProyecto(idproyecto) {
  const sql = "DELETE FROM proyecto WHERE idproyecto = ?";
  const connection = await MySQLConnection(); // Obtener la conexión

  try {
    const [result] = await connection.execute(sql, [idproyecto]);
    return result;
  } catch (err) {
    console.error("Error al eliminar proyecto:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

module.exports = {
  createProyecto,
  getAllProyectos,
  getProyectoById,
  updateProyecto,
  deleteProyecto,
};
