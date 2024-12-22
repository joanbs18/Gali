const User = require("../models/Auth"); // Importar el modelo del usuario
const jwt = require("jsonwebtoken"); // Librería para manejar JWT
const bcrypt = require("bcrypt"); // Librería para cifrar contraseñas
const secretKey = process.env.JWT_SECRET_KEY; // Clave secreta para el JWT

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que los campos necesarios estén presentes
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si el nombre de usuario ya existe
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya existe" });
    }

    const userData = { username, password };
    const userId = await User.createUser(userData);

    return res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", userId });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res
      .status(500)
      .json({ error: "Error del servidor, por favor intente nuevamente" });
  }
};

// Función para iniciar sesión (login)
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que los campos necesarios estén presentes
    if (!username || !password) {
      return res.status(400).json({
        error: "El nombre de usuario y la contraseña son obligatorios",
      });
    }

    // Buscar el usuario por su nombre de usuario
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si la contraseña es válida (compara el hash con el texto plano)
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Crear el token JWT
    const payload = { id: user.id, username: user.usuario };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // El token expira en 1 hora

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "production",
        //sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .send({message: "Inicio de sesión exitoso"})
    //res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({
      error: "Error del servidor, por favor intente nuevamente",
    });
  }
};

// Función para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res
      .status(500)
      .json({ error: "Error del servidor, por favor intente nuevamente" });
  }
};

// Función para obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return res
      .status(500)
      .json({ error: "Error del servidor, por favor intente nuevamente" });
  }
};

// Función para eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res
      .status(500)
      .json({ error: "Error del servidor, por favor intente nuevamente" });
  }
};



// Exportar todas las funciones del controlador
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
