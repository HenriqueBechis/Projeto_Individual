b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function publicar() {
    var idUsuario = sessionStorage.ID_USUARIO;
    const formData = new FormData();
    formData.append(`imgNova`, imgNova.files[0])
    formData.append(`titulo`,form_postagem.titulo.value )
    formData.append(`descricao`,form_postagem.descricao.value )


    fetch(`/avisos/publicar/${idUsuario}`, {
        method: "post",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        body: formData
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!");
            window.location = "/dashboard/feed.html";
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

function editar(idAviso) {
    sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;
    console.log("cliquei em editar - " + idAviso);
    window.alert("Você será redirecionado à página de edição do aviso de id número: " + idAviso);
    window.location = "/dashboard/edicao-aviso.html"

}
function responder(idAviso) {
    sessionStorage.ID_POSTAGEM_RESPONDENDO = idAviso;
    // console.warn(sessionStorage.ID_POSTAGEM_RESPONDENDO)     
    window.location = "/dashboard/responder.html"
    console.log("cliquei em responder - " + idAviso);
}

function deletar(idAviso) {
    console.log("Criar função de apagar post escolhido - ID" + idAviso);
    fetch(`/avisos/deletar/${idAviso}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Post deletado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
            window.location = "/dashboard/feed.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

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

                    /* criando e manipulando elementos do HTML via JavaScript*/
                    //spans e divs
                    var divPublicacao = document.createElement("div");
                    var spanImg = document.createElement("div");
                    var spanImg2 = document.createElement("div");
                    var spanTitulo = document.createElement("span");
                    var spanNome = document.createElement("span");
                    var spanEstrela = document.createElement("span");
                    var divDescricao = document.createElement("div");
                    var divButtons = document.createElement("div");
                    var divIndice = document.createElement("div");
                    //botões
                    var btnEstrela = document.createElement("button");
                    var btnEditar = document.createElement("button");
                    var btnDeletar = document.createElement("button");
                    var btnResponder = document.createElement("button");

                    /*Defição do innerHTML*/
                    //spans e divs
                    spanImg.innerHTML = `<img src="../../assets/${publicacao.foto}" id="" >`;
                    spanImg2.innerHTML = `<img src="../../assets/${publicacao.fotoDesc}" id="" >`;
                    spanTitulo.innerHTML = "Tema: <b>" + publicacao.titulo + "</b>";
                    spanNome.innerHTML = `<b>` + publicacao.nome + "</b>";
                    spanEstrela.innerHTML ="Estrelas:" + publicacao.Estrelas;
                    divDescricao.innerHTML = "Descrição: <b>" + publicacao.descricao + "</b>";
                    //botões
                    btnEstrela.innerHTML = "Estrela";
                    btnEditar.innerHTML = "Editar";
                    btnDeletar.innerHTML = "Deletar";
                    btnResponder.innerHTML = "Responder";
                    /* Fim da definição do innerHTML */

                    /* Definição das classes das divs e spans */
                    //Spans
                    spanTitulo.id = "inputNumero" + publicacao.idAviso;
                    spanNome.setAttribute("onclick", `visitarPerfil(${publicacao.idUsuario})`)
                    spanImg.className = "spanImg";
                    spanImg2.className = "spanImg2";   
                    spanNome.className = "publicacao-nome";
                    spanTitulo.className = "publicacao-titulo";
                    spanEstrela.ClassName = "spanEstrela";
                    //Divs
                    divPublicacao.className = "publicacao";
                    divDescricao.className = "publicacao-descricao";
                    divIndice.className = "div-indice";
                    divButtons.className = "div-buttons";
                    /* Fim da definição das classes de divs e spans */

                    /* Definição das propriedades dos botões */
                    //Botão para estrela
                    btnEstrela.className = "publicacao-btn-editar";
                    btnEstrela.id = "btnEstrela" + publicacao.idAviso;
                    btnEstrela.setAttribute("onclick", `darEstrelaFeed(${publicacao.idAviso})`)
                    //botão para edição da publicação
                    btnEditar.className = "publicacao-btn-editar"
                    btnEditar.id = "btnEditar" + publicacao.idAviso;
                    btnEditar.setAttribute("onclick", `editar(${publicacao.idAviso})`);
                    //Botão para deletar
                    btnDeletar.className = "publicacao-btn-editar"
                    btnDeletar.id = "btnDeletar" + publicacao.idAviso;
                    btnDeletar.setAttribute("onclick", `deletar(${publicacao.idAviso})`);
                    //Botão para responder a publicação
                    btnResponder.className = "publicacao-btn-editar"
                    btnResponder.id = "btnResponder" + publicacao.idAviso;
                    btnResponder.setAttribute("onclick", `responder(${publicacao.idAviso})`);
                    /* Fim da definição das propriedades dos botões */

                    /* Definição dos elementos pai/filho e organização da publicação */
                    divPublicacao.appendChild(spanImg);
                    divPublicacao.appendChild(divIndice);
                    divPublicacao.appendChild(spanNome);
                    divPublicacao.appendChild(spanTitulo);
                    divPublicacao.appendChild(divDescricao);
                    divPublicacao.appendChild(spanImg2);
                    divPublicacao.appendChild(spanEstrela);
                    divIndice.appendChild(spanImg);
                    divIndice.appendChild(spanNome);
                    divPublicacao.appendChild(divButtons);
                    divButtons.appendChild(btnEstrela);
                    //Validação para o usuário poder editar e deletar apenas o próprio aviso 
                    if (publicacao.idUsuario == sessionStorage.ID_USUARIO || sessionStorage.ID_USUARIO == 1) {
                        divButtons.appendChild(btnEditar);
                        divButtons.appendChild(btnDeletar);
                    }
                    divButtons.appendChild(btnResponder);
                    feed.appendChild(divPublicacao);
                    /* Fim da definição dos elemtos pai/filho */
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}

function testar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_postagem")));

    var divResultado = document.getElementById("div_feed");

    divResultado.appendChild(document.createTextNode(formulario.get("descricao")));
    divResultado.innerHTML = formulario.get("descricao");

    finalizarAguardar();

    return false;
}
function darEstrelaFeed(idAviso){
    var idUsuario = sessionStorage.ID_USUARIO;
    var corpo = {
        idAviso: idAviso
    }
    fetch(`/avisos/darEstrelaFeed/${idUsuario}`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(corpo)
    }).then(function (resposta){
        console.log("resposta: ", resposta);
        if(resposta.ok){
            atualizarFeed()
        }else if(resposta.status == 404){
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! código da resposta: " + resposta.status)
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`)
    });
    return false;
}
function editarPerfil(){
    window.location = "/dashboard/perfil.html"
}
function mostrarAnalytics(){
    window.location = "/dashboard/analytics.html"
}