var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
var perfilController = require("../controllers/perfilController");

router.put("/editarNome/:idUsuario", function (req, res) {
    perfilController.editarNome(req, res);
});

router.put("/editarIdade/:idUsuario", function (req, res) {
    perfilController.editarIdade(req, res);
});

router.put("/editarInstrumento/:idUsuario", function (req,res) {
    perfilController.editarInstrumento(req,res);
});

router.get("/mostrarNome/:idUsuario", function (req,res){
    perfilController.mostrarNome(req,res);
});

router.get("/mostrarDados/:idUsuario", function (req,res){
    perfilController.mostrarDados(req,res);
});

router.get("/mostrarFoto/:idUsuario", function(req,res) {
    perfilController.mostrarFoto(req,res);
})

router.post("/alterarImagem/:idUsuario", upload.single('imgNova'), (req, res) => {
    perfilController.alterarImagem(req, res);
});

router.post("/seguir/:idUsuario", function (req,res) {
    perfilController.seguir(req,res);
});

module.exports = router;