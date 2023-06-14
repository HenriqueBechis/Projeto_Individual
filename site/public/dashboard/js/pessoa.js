
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
                    var descricao = resposta[0].descricao
                    var Foto = document.getElementById("usuarioFoto");
                    Foto.src = `../assets/${infos.foto}`;
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    b_usuario.innerHTML = `${nome}`;
                    idade_usuario.innerHTML = `${idade}`
                    instrumento_usuario.innerHTML = `${instrumento} `
                    descricao_usuario.innerHTML = `${descricao} `
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
                var ListaSeguidores = document.getElementById("ListaSeguidores");
                ListaSeguidores.innerHTML = "";

                //plotagem dos seguidores
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    
                    //Criando os elementos HTML
                    var spanNome = document.createElement("span");
                    var spanImg = document.createElement("span");
                    
                    //Definição dos innerHTML
                    spanNome.innerHTML = "Nome: <b>" + publicacao.nome + "</b>"
                    spanImg.innerHTML = `<img src="../../assets/${publicacao.foto}" id="" >`;
                    
                    //Definição das propriedades dos elementos
                    spanImg.className = "imgSeguidor";
                    spanNome.setAttribute("onclick", `visitarPerfil(${publicacao.idUsuario})`)
                    spanNome.className = "publicacao-nome";


                    //Organização dos elementos HTML
                    ListaSeguidores.appendChild(spanImg);
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
/* Função para listar as duvidas */
function listarDuvidas(){
    var idUsuario = sessionStorage.ID_VISITANDO;
    fetch(`/perfil/listarDuvidas/${idUsuario}`).then(function (resposta) {
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

                var feed = document.getElementById("feed");
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