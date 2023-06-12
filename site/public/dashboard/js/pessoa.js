
function visitarPerfil(idUsuario) {
    window.location = "/dashboard/pessoa.html"
    sessionStorage.ID_VISITANDO = idUsuario;
}
/* Função para Puxaar os dados do usuário que esta sendo visitado */
function puxarDados(idUsuario) {
    var idUsuario = sessionStorage.ID_VISITANDO
    fetch(`/perfil/mostrarDados/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json()
                .then(function (resposta) {
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
            throw ("Houve um erro na API");
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}
/* Função para começar a seguir o usuário */
function Seguir() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var corpo = {
        idSeguido: sessionStorage.ID_VISITANDO
    };
    fetch(`/perfil/seguir/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(corpo)
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            window.alert("Deu certo")
        }else if(resposta.status == 404){
            window.alert("Deu 404")
        }else {
            throw("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status)
        }
    }).catch(function(resposta){
        console.log(`#ERRO: ${resposta}`)
    })
    return false;
};
/* Função para listar os seguidores */
function listarSeguidores(){
    var idSeguido = sessionStorage.ID_VISITANDO;
    fetch(`/perfil/listarSeguidores/${idSeguido}`).then(function (resposta) {
        if(resposta.ok){
            if(resposta.status == 204){
                var listaSeguidores = document.getElementById("listaSeguidores")
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                listaSeguidores.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var listaSeguidores = document.getElementById("listaSeguidores");
                ListaSeguidores.innerHTML = "";

                //plotagem dos seguidores
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    
                    //Criando os elementos HTML
                    var spanNome = document.createElement("span");
                    
                    spanNome.innerHTML = "Nome: <b>" + publicacao.nome + "</b>"

                    ListaSeguidores.appendChild(spanNome);
                }
            });
        } else {
            throw (`Houve um erro na API!`)
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}