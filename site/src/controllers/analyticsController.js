var analyticsModel = require("../models/analyticsModel");

function mostrarInstrumentos(req, res){

    analyticsModel.mostrarInstrumentos()
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    mostrarInstrumentos
};