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

function editarDescricao(req,res){
    var novaDescricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;
    perfilModel.editarDescricao(novaDescricao, idUsuario)
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

function seguir(req, res){
    var idUsuario = req.params.idUsuario;
    var idSeguido = req.body.idSeguido;
    perfilModel.seguir(idUsuario, idSeguido)
    .then(function (resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else {
            res.status(204).send("Nenhum resultado encontrado")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os dados ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
    });
}

function listarSeguidores(req,res){
    var idSeguido = req.params.idSeguido;
    perfilModel.listarSeguidores(idSeguido)
        .then(
            function(resultado){
                res.json(resultado);
            }
        )
        .catch(
            function (erro){
                console.log(erro);
                console.log("Houve um erro ao buscar os dados: ", erro.sqlMessage);
            }
        )
}

function listarDuvidas(req,res){
    var idUsuario = req.params.idUsuario;
    perfilModel.listarDuvidas(idUsuario)
        .then(
            function(resultado){
                res.json(resultado);
            }
        )
        .catch(
            function(erro){
                console.log(erro);
                console.log("Houve um erro ao buscar os dados ", erro.sqlMessage);
            }
        )
}

module.exports = {
    editarNome,
    editarIdade,
    editarInstrumento,
    editarDescricao,
    mostrarNome,
    mostrarDados,
    mostrarFoto,
    seguir,
    listarSeguidores,
    listarDuvidas,
    alterarImagem
}