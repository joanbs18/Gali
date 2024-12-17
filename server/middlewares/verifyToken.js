// middlewares/verifyToken.js
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  // Rutas públicas que no requieren validación de token
  const publicRoutes = ["/login", "/register"];

  // Si la ruta es pública, no es necesario verificar el token
  if (publicRoutes.includes(req.path)) {
    return next(); // Permite acceso sin validar el token
  }

  // Obtener el token desde las cookies
  const token = req.cookies.access_token;

  // Si no hay token, se retorna un error
  if (!token) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  console.log(token);

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, secretKey);

    // Almacenar la información del usuario en la request para su uso posterior
    req.user = decoded;

    // Continuar con la siguiente función de middleware o el controlador
    next();
  } catch (error) {
    // Si el token es inválido o ha expirado
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = verifyToken;
