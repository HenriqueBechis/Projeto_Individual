/* Função para mostrar os dados na tela de perfil */
function mostrarDados(){
    var idUsuario = sessionStorage.ID_USUARIO
    fetch(`/perfil/mostrarDados/${idUsuario}`).then(function (resposta) {
        if(resposta.ok){
            resposta.json()
            .then(function (resposta){
                infos = resposta[0]
                var idade = resposta[0].idade
                var instrumento = resposta[0].instrumento
                var Foto = document.getElementById("usuarioFoto");
                Foto.src = `../assets/${infos.foto}`;
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                idade_usuario.innerHTML = `${idade}`
                instrumento_usuario.innerHTML = `${instrumento}`

            })
        } else {
            throw("Houve um erro na API");
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}
/* Funções de edição de dados */
function editarNome() {

    fetch(`/perfil/editarNome/${sessionStorage.getItem("ID_USUARIO")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricao: ipt_novoNome.value
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            // window.alert("Post atualizado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
            atualizarDados()
            // window.location = "/dashboard/mural.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function editarIdade() {

    fetch(`/perfil/editarIdade/${sessionStorage.getItem("ID_USUARIO")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricao: ipt_novaIdade.value
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            mostrarDados()
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function editarInstrumento(){
    var idUsuario = sessionStorage.ID_USUARIO;
    var ax_novoInstrumento = ipt_novoInstrumento.value;
    fetch(`/perfil/editarInstrumento/${idUsuario}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricao: ax_novoInstrumento
        })
    }).then(function(resposta){
        if(resposta.ok) {
            mostrarDados()
        } else if(resposta.status == 404){
            window.alert("deu 404");
        } else {
            throw("Houve um erro ao tentar realizar a postagem! Código da resposta:" + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO ${resposta}`);
    })
}
function novaImagem() {
    var idUsuario = sessionStorage.ID_USUARIO;
    const formData = new FormData();
    formData.append('imgNova', imgNova.files[0])

    fetch(`/perfil/alterarImagem/${idUsuario}`, {
        method: "POST",
        body: formData
    })
        .then(res => {
            mostrarDados()
        })
        .catch(err => {
            console.log(err);
        })
}