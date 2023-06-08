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

function mostrarNome(req,res){
    var idUsuario = req.params.idUsuario
    perfilModel.mostrarNome(idUsuario)
    .then(
        function (resultado){
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

function mostrarDados(req,res){
    var idUsuario = req.params.idUsuario
    perfilModel.mostrarDados(idUsuario)
    .then(
        function (resultado){
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

module.exports = {
    editarNome,
    mostrarNome,
    mostrarDados
}