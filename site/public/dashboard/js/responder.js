function atualizarFeed() {
    
    //aguardar();
    fetch("/avisos/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    if(sessionStorage.ID_POSTAGEM_RESPONDENDO == publicacao.idAviso){

                    // criando e manipulando elementos do HTML via JavaScript
                    var divPublicacao = document.createElement("div");
                    var spanID = document.createElement("span");
                    var spanTitulo = document.createElement("span");
                    var spanNome = document.createElement("span");
                    var divDescricao = document.createElement("div");
                    var divButtons = document.createElement("div");
                    var btnEditar = document.createElement("button");
                    var btnDeletar = document.createElement("button");
                    var btnResponder = document.createElement("button");


                    spanID.innerHTML = "ID: <b>" + publicacao.idAviso + "</b>";
                    spanTitulo.innerHTML = "Título: <b>" + publicacao.titulo + "</b>";
                    spanNome.innerHTML = "Autor: <b>" + publicacao.nome + "</b>";
                    divDescricao.innerHTML = "Descrição: <b>" + publicacao.descricao + "</b>";
                    btnEditar.innerHTML = "Editar";
                    btnDeletar.innerHTML = "Deletar";
                    btnResponder.innerHTML = "Responder";

                    divPublicacao.className = "publicacao";
                    spanTitulo.id = "inputNumero" + publicacao.idAviso;
                    spanNome.className = "publicacao-nome";
                    spanTitulo.className = "publicacao-titulo";
                    divDescricao.className = "publicacao-descricao";

                    divButtons.className = "div-buttons"

                    btnEditar.className = "publicacao-btn-editar"
                    btnEditar.id = "btnEditar" + publicacao.idAviso;
                    btnEditar.setAttribute("onclick", `editar(${publicacao.idAviso})`);

                    btnDeletar.className = "publicacao-btn-editar"
                    btnDeletar.id = "btnDeletar" + publicacao.idAviso;
                    btnDeletar.setAttribute("onclick", `deletar(${publicacao.idAviso})`);

                    btnResponder.className = "publicacao-btn-editar"
                    btnResponder.id = "btnResponder" + publicacao.idAviso;
                    btnResponder.setAttribute("onclick", `responder(${publicacao.idAviso})`);

                    divPublicacao.appendChild(spanID);
                    divPublicacao.appendChild(spanNome);
                    divPublicacao.appendChild(spanTitulo);
                    divPublicacao.appendChild(divDescricao);
                    divPublicacao.appendChild(divButtons);
                    divButtons.appendChild(btnEditar);
                    divButtons.appendChild(btnDeletar);
                    divButtons.appendChild(btnResponder);
                    feed.appendChild(divPublicacao);
                }
                    }
                    

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}
function responder(){
   
    var idUsuario = sessionStorage.ID_USUARIO;
    var idAviso = sessionStorage.ID_POSTAGEM_RESPONDENDO;
    // alert("esta chamando")
        var corpo = {
            descricao: form_postagem.descricao.value,
            idAviso: sessionStorage.ID_POSTAGEM_RESPONDENDO
        }

        fetch(`/avisos/responder/${idUsuario}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {
            
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                window.alert("Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!");
                // window.location = "../responder.html";
                limparFormulario();
                finalizarAguardar();
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

        return false;

}