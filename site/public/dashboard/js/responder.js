// setInterval(()=> {atualizarFeed()}, 2000)
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
                    if (sessionStorage.ID_POSTAGEM_RESPONDENDO == publicacao.idAviso) {

                        // criando e manipulando elementos do HTML via JavaScript
                        var divPublicacao = document.createElement("div");
                        var spanImg = document.createElement("div")
                        var spanImg2 = document.createElement("div")
                        var spanID = document.createElement("span");
                        var spanTitulo = document.createElement("span");
                        var spanNome = document.createElement("span");
                        var divDescricao = document.createElement("div");
                        var divButtons = document.createElement("div");
                        var btnEditar = document.createElement("button");
                        var btnDeletar = document.createElement("button");
                        var btnResponder = document.createElement("button");
                        var divIndice = document.createElement("div");

                        spanImg.innerHTML = `<img src="../../assets/${publicacao.foto}" id="" >`;
                        spanImg2.innerHTML = `<img src="../../assets/${publicacao.fotoDesc}" id="" >`;
                        spanID.innerHTML = "ID: <b>" + publicacao.idAviso + "</b>";
                        spanTitulo.innerHTML = "Título: <b>" + publicacao.titulo + "</b>";
                        spanNome.innerHTML = "Autor: <b>" + publicacao.nome + "</b>";
                        divDescricao.innerHTML = "Descrição: <b>" + publicacao.descricao + "</b>";
                        btnEditar.innerHTML = "Editar";
                        btnDeletar.innerHTML = "Deletar";
                        btnResponder.innerHTML = "Responder";


                        spanImg.className = "spanImg";
                        spanImg2.className = "spanImg2"
                        divPublicacao.className = "publicacao";
                        spanTitulo.id = "inputNumero" + publicacao.idAviso;
                        spanNome.className = "publicacao-nome";
                        spanTitulo.className = "publicacao-titulo";
                        divDescricao.className = "publicacao-descricao";
                        divIndice.className = "div-indice";
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


                        divPublicacao.appendChild(spanImg);
                        divPublicacao.appendChild(divIndice);
                        divPublicacao.appendChild(spanNome);
                        divPublicacao.appendChild(spanTitulo);
                        divPublicacao.appendChild(divDescricao);
                        divPublicacao.appendChild(spanImg2);
                        divIndice.appendChild(spanImg);
                        divIndice.appendChild(spanNome)


                        // divPublicacao.appendChild(divButtons);
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

    //Listar as respostas
    fetch(`/avisos/listarRespostas`).then(function (resposta) {
        console.warn(resposta);
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_resposta");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_resposta");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    if (sessionStorage.ID_POSTAGEM_RESPONDENDO == publicacao.fk_aviso) {

                        /*criando e manipulando elementos do HTML via JavaScript*/
                        // Spans e divs
                        var divPublicacao = document.createElement("div");
                        var spanImg = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var spanEstrela = document.createElement("span");
                        var divDescricao = document.createElement("div");
                        var divButtons = document.createElement("div");
                        var divIndice = document.createElement("div");
                        //botões
                        var btnEditar = document.createElement("button");
                        var btnDeletar = document.createElement("button");
                        var btnEstrela = document.createElement("button");  

                        /* Definição dos innerHTML */
                        //spans e divs
                        spanImg.innerHTML = `<img src="../../assets/${publicacao.foto}" id="" >`;
                        spanNome.innerHTML = "Autor: <b>" + publicacao.nome + "</b>";
                        spanEstrela.innerHTML = " Estrelas: " + publicacao.Estrela;
                        divDescricao.innerHTML = "Descrição: <b>" + publicacao.descricao + "</b>";
                        //Botões
                        btnEditar.innerHTML = "Editar";
                        btnDeletar.innerHTML = "Deletar";
                        btnEstrela.innerHTML = "Estrela"
                        /* Fim da definição dos innerHTML */

                        /* Definição das classes das divs e spans */
                        // spans
                        spanNome.className = "publicacao-nome";
                        spanEstrela.className = "publicacao-nome";
                        spanImg.className = "spanImg";
                        //divs
                        divDescricao.className = "publicacao-descricao";
                        divPublicacao.className = "publicacao";
                        divButtons.className = "div-buttons";
                        divIndice.className = "div-indice";

                        /* Definição das propriedades dos botões */
                        //botão para edição
                        btnEditar.className = "publicacao-btn-editar"
                        btnEditar.id = "btnEditar" + publicacao.idAviso;
                        btnEditar.setAttribute("onclick", `editar(${publicacao.idAviso})`);

                        // Botão para deleta
                        btnDeletar.className = "publicacao-btn-editar"
                        btnDeletar.id = "btnDeletar" + publicacao.idAviso;
                        btnDeletar.setAttribute("onclick", `deletarResposta(${publicacao.idResposta})`);

                        //Botão para dar estrela
                        btnEstrela.className = "btn-Estrela";
                        btnEstrela.id = "btnEstrela" + publicacao.idAviso;
                        btnEstrela.setAttribute("onclick", `darEstrela(${publicacao.idResposta})`);

                        /* Definição dos elementos pai/Filho e organização das publicação */
                        divPublicacao.appendChild(spanImg);
                        divPublicacao.appendChild(divIndice)
                        divPublicacao.appendChild(spanNome);
                        divPublicacao.appendChild(spanEstrela);
                        divPublicacao.appendChild(divDescricao);
                        divPublicacao.appendChild(divButtons);
                        divIndice.appendChild(spanImg);
                        divIndice.appendChild(spanNome);
                        divButtons.appendChild(btnEstrela);
                        //Validação para o usuário poder editar ou deletar apenas o próprio comentário
                        if (publicacao.idUsuario == sessionStorage.ID_USUARIO || sessionStorage.ID_USUARIO == 1) {
                            divButtons.appendChild(btnEditar);
                            divButtons.appendChild(btnDeletar);
                        }
                        feed.appendChild(divPublicacao);
                        /* Fim da definição dos elementos pai/Filho */
                    }
                }
                
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}
function responder() {

    var idUsuario = sessionStorage.ID_USUARIO;
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

            // window.alert("Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!");

            // window.location = "/dashboard/responder.html";
            atualizarFeed();
            // limparFormulario();
            // finalizarAguardar();
            return true
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;

}

function darEstrela(idResposta) {

    var idUsuario = sessionStorage.ID_USUARIO;


    var Estrela = {
        idResposta: idResposta
    }

    fetch(`/avisos/darEstrela/${idUsuario}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Estrela)
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // window.location = "/dashboard/responder.html";
            atualizarFeed();
            // limparFormulario();
            // finalizarAguardar();
            return true
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;
}

function deletarResposta(idResposta) {
    // console.log("Criar função de apagar post escolhido - ID" + idResposta);
    fetch(`/avisos/deletarResposta/${idResposta}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            // window.alert("Post deletado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
            // window.location = "/dashboard/responder.html"
            atualizarFeed()
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}