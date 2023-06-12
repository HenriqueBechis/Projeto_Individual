
function visitarPerfil(idUsuario){
    window.location = "/dashboard/pessoa.html"
    sessionStorage.ID_VISITANDO = idUsuario;
}
function puxarDados(idUsuario){
    var idUsuario = sessionStorage.ID_VISITANDO
    fetch(`/perfil/mostrarDados/${idUsuario}`).then(function (resposta) {
        if(resposta.ok){
            resposta.json()
            .then(function (resposta){
                infos = resposta[0]
                var idade = resposta[0].idade
                var nome = resposta[0].nome
                var instrumento = resposta[0].instrumento
                var Foto = document.getElementById("usuarioFoto");
                Foto.src = `../assets/${infos.foto}`;
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                b_usuario.innerHTML = `${nome}`;
                idade_usuario.innerHTML = `${idade}<br>`
                instrumento_usuario.innerHTML = `${instrumento} <br>`
            })
        } else {
            throw("Houve um erro na API");
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}