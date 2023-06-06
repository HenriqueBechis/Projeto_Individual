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
            window.alert("Post atualizado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
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