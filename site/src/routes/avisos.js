var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listarRespostas", function (req, res) {
    avisoController.listarRespostas(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", upload.single('imgNova'), (req, res) => {
    avisoController.publicar(req, res);
});


router.post("/responder/:idUsuario", function (req, res) {
    avisoController.responder(req, res);
});

router.post("/darEstrela/:idUsuario", function (req, res) {
    avisoController.darEstrela(req, res);
});

router.post("/darEstrelaFeed/:idUsuario", function (req,res) {
    avisoController.darEstrelaFeed(req,res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

router.delete("/deletarResposta/:idResposta", function (req, res) {
    avisoController.deletarResposta(req, res);
});

module.exports = router;