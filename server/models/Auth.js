
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const MySQLConnection = require("../config/mysql"); // Importa la conexión



// Función para generar un ID único usando crypto
const generateUniqueId = () => {
    return crypto.randomBytes(16).toString('hex');  // Genera un ID único en formato hexadecimal
  };
  
  // Función para crear un nuevo usuario
  const createUser = async (userData) => {
    const { username, password } = userData;
    
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));  
  
      // Generar un ID único para el usuario
      const userId =  generateUniqueId();
  
      // SQL para insertar el nuevo usuario con un ID único
      const query = 'INSERT INTO usuario (id, usuario, contraseña) VALUES (?, ?, ?)';
      const connection = await MySQLConnection(); // Obtener la conexión desde el pool
      const [result] = await connection.execute(query, [userId, username, hashedPassword]);

      return userId; 
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el usuario');
    }
  };
  

// Función para obtener un usuario por su nombre de usuario
const getUserByUsername = async (username) => {
  try {
    const query = 'SELECT * FROM usuario WHERE usuario = ?';
    const connection = await MySQLConnection();
    const [rows] = await connection.execute(query, [username]);

    return rows[0];  
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};

// Función para obtener un usuario por su ID
const getUserById = async (id) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    const [rows] = await pool.promise().query(query, [id]);

    return rows[0];  // Devuelve el usuario encontrado
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};

// Función para verificar la contraseña de un usuario
const verifyPassword = async (inputPassword, storedPassword) => {
  try {
    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error al verificar la contraseña');
  }
};

// Función para obtener todos los usuarios
const getAllUsers = async () => {
  try {
    const query = 'SELECT * FROM usuarios';
    const [rows] = await pool.promise().query(query);

    return rows;  // Devuelve todos los usuarios
  } catch (error) {
    throw new Error('Error al obtener todos los usuarios');
  }
};

// Función para eliminar un usuario por ID
const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const [result] = await pool.promise().query(query, [id]);

    return result;  // Devuelve el resultado de la eliminación
  } catch (error) {
    throw new Error('Error al eliminar el usuario');
  }
};

// Exportar todas las funciones del modelo
module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  verifyPassword,
  getAllUsers,
  deleteUser
};
