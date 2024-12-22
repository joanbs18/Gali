const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get("/proyectos", verifyToken, function (req, res) {
  res.render("proyectos"); // Renderiza la vista 'proyectos.ejs'
});

router.get("/subproyectos", verifyToken, function (req, res) {
  res.render("subproyectos"); // Renderiza la vista 'subproyectos.ejs'
});

router.get("/login", function (req, res) {
  res.render("login");
});

module.exports = router;
