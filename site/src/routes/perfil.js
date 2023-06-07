var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.put("/editarNome/:idUsuario", function (req, res) {
    perfilController.editarNome(req, res);
});

router.get("/mostrarDados/:idUsuario", function (req,res){
    perfilController.mostrarDados(req,res);
});
module.exports = router;