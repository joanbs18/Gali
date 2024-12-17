const MySQLConnection = require("../config/mysql"); // Importa la conexión

// Función para crear una nueva imagen asociada a un proyecto
async function createImagenProyecto(idproyecto, imagen, descripcion) {
  console.log(idproyecto);
  const sql =
    "INSERT INTO imagenproyecto (idproyecto, imagen, descripcion) VALUES (?, ?, ?)";
  const connection = await MySQLConnection(); // Obtener la conexión desde el pool

  try {
    const [result] = await connection.execute(sql, [
      idproyecto,
      imagen,
      descripcion,
    ]);
    return result;
  } catch (err) {
    console.error("Error al crear imagen:", err);
    throw err; 
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

// Función para obtener todas las imágenes asociadas a un proyecto
async function getSubProyectos() {
  const sql =
    " SELECT p.nombre, p.descripcion AS proyecto_descripcion, p.equipo, p.imagen AS proyecto_imagen,ip.idimagenproyecto, ip.imagen AS imagen, ip.descripcion AS imagen_descripcion FROM imagenproyecto ip LEFT JOIN proyecto p ON p.idproyecto = ip.idproyecto;";
  const connection = await MySQLConnection(); // Obtener la conexión desde el pool

  try {
    const [results] = await connection.execute(sql);
    return results;
  } catch (err) {
    console.error("Error al obtener imágenes:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

// Función para obtener todas las imágenes asociadas a un proyecto
async function getImagenesByProyecto(idproyecto) {
  const sql = "SELECT * FROM imagenproyecto WHERE idproyecto = ?";
  const connection = await MySQLConnection(); // Obtener la conexión desde el pool

  try {
    const [results] = await connection.execute(sql, [idproyecto]);
    return results;
  } catch (err) {
    console.error("Error al obtener imágenes:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}
// Asumiendo que `MySQLConnection()` retorna un pool de conexiones (por ejemplo, usando mysql2)
async function getProyectoWithImagenes(idproyecto) {
  const connection = await MySQLConnection(); // Esto obtiene el pool de conexiones
  const sql = `
    SELECT p.nombre, p.descripcion AS proyecto_descripcion, p.equipo, p.imagen AS proyecto_imagen,
           ip.idimagenproyecto, ip.imagen AS imagen, ip.descripcion AS imagen_descripcion
    FROM proyecto p
    LEFT JOIN imagenproyecto ip ON p.idproyecto = ip.idproyecto
    WHERE p.idproyecto = ?;
  `;

  try {
    // Ejecuta la consulta utilizando la conexión obtenida del pool
    const [results] = await connection.execute(sql, [idproyecto]);
    return results; // Retorna los resultados
  } catch (err) {
    console.error("Error al obtener proyecto con imágenes:", err);
    throw err; // Lanza el error para manejarlo en el controlador
  } finally {
    // Asegúrate de cerrar la conexión al final
    await connection.end();
  }
}

// Función para actualizar una imagen asociada a un proyecto
async function updateImagenProyecto(idimagenproyecto, imagen, descripcion) {
  const sql =
    "UPDATE imagenproyecto SET imagen = ?, descripcion = ? WHERE idimagenproyecto = ?";
  const connection = await MySQLConnection(); // Obtener la conexión desde el pool

  try {
    const [result] = await connection.execute(sql, [
      imagen,
      descripcion,
      idimagenproyecto,
    ]);
    return result;
  } catch (err) {
    console.error("Error al actualizar imagen:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

// Función para eliminar una imagen de un proyecto
async function deleteImagenProyecto(idimagenproyecto) {
  const sql = "DELETE FROM imagenproyecto WHERE idimagenproyecto = ?";
  const connection = await MySQLConnection(); // Obtener la conexión desde el pool

  try {
    const [result] = await connection.execute(sql, [idimagenproyecto]);
    return result;
  } catch (err) {
    console.error("Error al eliminar imagen:", err);
    throw err; // Lanza el error para que sea manejado en el controlador
  } finally {
    await connection.end(); // Asegura que la conexión se cierra
  }
}

module.exports = {
  createImagenProyecto,
  getImagenesByProyecto,
  getProyectoWithImagenes,
  updateImagenProyecto,
  deleteImagenProyecto,
  getSubProyectos,
};
