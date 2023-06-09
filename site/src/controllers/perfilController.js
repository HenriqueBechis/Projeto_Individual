var perfilModel = require("../models/perfilModel");


function editarNome(req, res) {

    var idUsuario = req.params.idUsuario
    var novoNome = req.body.descricao
    perfilModel.editarNome(novoNome, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarIdade(req, res) {

    var idUsuario = req.params.idUsuario
    var novaIdade = req.body.descricao
    perfilModel.editarIdade(novaIdade, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarInstrumento(req, res) {
    var novoInstrumento = req.body.descricao;
    var idUsuario = req.params.idUsuario;
    perfilModel.editarInstrumento(novoInstrumento, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function mostrarNome(req, res) {
    var idUsuario = req.params.idUsuario
    perfilModel.mostrarNome(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function mostrarDados(req, res) {
    var idUsuario = req.params.idUsuario;
    
    perfilModel.mostrarDados(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function mostrarFoto(req,res){
    var idUsuario = req.params.idUsuario;

    perfilModel.mostrarFoto(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function alterarImagem(req, res) {
    var foto = req.file.filename;
    var idUsuario = req.params.idUsuario;

    perfilModel.alterarImagem(foto, idUsuario)
    .then(resultado => {
        // res.status(201).send("foto alterada com sucesso");
        res.json(resultado);
      }).catch(err => {
        res.status(500).send(err);
      });
}

module.exports = {
    editarNome,
    editarIdade,
    editarInstrumento,
    mostrarNome,
    mostrarDados,
    mostrarFoto,
    alterarImagem
}