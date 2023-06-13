var database = require("../database/config");

function mostrarInstrumentos(){
    var instrucao = `
    SELECT COUNT(*) AS qtd,
    instrumento FROM usuario 
    GROUP BY instrumento;
    `
    return database.executar(instrucao)
};

module.exports = {
    mostrarInstrumentos
}
