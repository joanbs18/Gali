const express = require("express");
const path = require("path"); // Importar el módulo 'path'
const { registerUser, loginUser } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();


//COMENTADO PARA EVITAR QUE LO USEN MÁS
// router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta protegida: Solo accesible con token
// router.get("/protected", (req, res) => {
//     res.render('proyectos');
// });




module.exports = router;
