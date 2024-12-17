const express = require("express");
const path = require("path"); // Importar el módulo 'path'
const { registerUser, loginUser } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

// Ruta para registrar usuarios
router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta protegida: Solo accesible con token
router.get("/protected", verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'proyectos.html'));
});
// Evitar acceso directo a proyectos.html
router.get('/public/proyectos.html', (req, res) => {
    res.status(403).send('Acceso prohibido');
});


module.exports = router;
