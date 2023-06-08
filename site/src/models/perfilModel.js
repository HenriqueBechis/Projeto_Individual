var database = require("../database/config");


function editarNome(novoNome, idUsuario) {
    /*     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso); */
    var instrucao = `
    UPDATE usuario SET nome = '${novoNome}' WHERE id = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarIdade(novaIdade, idUsuario) {
    
    var instrucao = `
    UPDATE usuario SET idade = ${novaIdade} WHERE id = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarNome(idUsuario) {
    var instrucao = `
        SELECT nome FROM usuario WHERE id = ${idUsuario};
    `;
    console.log("executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao);
}

function mostrarDados(idUsuario){
    var instrucao = `
        SELECT idade, instrumento FROM usuario WHERE id = ${idUsuario};
    `
    console.log("executando a instrução SQL: \N" + instrucao)
    return database.executar(instrucao);
}
module.exports = {
    editarNome,
    editarIdade,
    mostrarNome,
    mostrarDados
}
