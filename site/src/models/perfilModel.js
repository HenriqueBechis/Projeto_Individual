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

function editarInstrumento(novoInstrumento, idUsuario) {
    var instrucao = `
    UPDATE usuario SET instrumento = '${novoInstrumento}' WHERE id = ${idUsuario}
    `
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

function editarDescricao(novaDescricao, idUsuario){
    var instrucao = `
        UPDATE usuario SET descricao = '${novaDescricao}' WHERE id = ${idUsuario};
    `
    return database.executar(instrucao);
}

function mostrarNome(idUsuario) {
    var instrucao = `
        SELECT nome FROM usuario WHERE id = ${idUsuario};
    `;
    console.log("executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao);
}

function mostrarDados(idUsuario) {
    var instrucao = `
        SELECT
        nome,
         idade, 
         instrumento,
         foto 
         FROM usuario WHERE id = ${idUsuario};
    `
    console.log("executando a instrução SQL: \N" + instrucao)
    return database.executar(instrucao);
}

function mostrarFoto(idUsuario){
    var instrucao = `
    SELECT 
    foto
    FROM usuario WHERE id = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

function alterarImagem(foto, idUsuario) {
    // console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterarNome():", foto, idusuario);
    var instrucao = `
    UPDATE usuario SET foto = '${foto}' WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function seguir(idUsuario, idSeguido){
    var instrucao = `
    INSERT INTO seguidores(idSeguido, fkSeguidor) VALUES (${idSeguido}, ${idUsuario})
    `
    return database.executar(instrucao);
}

function listarSeguidores (idSeguido){
    var instrucao = `
    SELECT 
    u.id AS idUsuario,
	u.nome,
	u.foto AS foto
	FROM usuario u
	JOIN seguidores s ON fkSeguidor = id
	AND s.idSeguido = ${idSeguido}
    `
    return database.executar(instrucao);
}

function listarDuvidas(idUsuario){
    var instrucao = `
    SELECT 
	a.titulo,
	a.descricao,
	a.imagem AS fotoDesc,
	u.foto AS foto,
	u.nome,
	COUNT(ep.estrela) AS Estrelas
 FROM aviso AS a      
	LEFT JOIN estrelaPublicacao ep ON ep.fkAviso = a.id
	JOIN usuario u ON a.fk_usuario = u.id
	WHERE a.fk_usuario = ${idUsuario}
	GROUP BY a.id;
    `
    return database.executar(instrucao);
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
