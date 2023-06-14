
CREATE DATABASE musica;
USE musica;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	idade INT,
	sexo VARCHAR(10),
	instrumento VARCHAR(20),
	foto VARCHAR(300),
	descricao VARCHAR(300)
);

SELECT * FROM usuario;
UPDATE usuario SET descricao = 'pra testar' WHERE id = 1;

CREATE TABLE seguidores(
	idSeguido INT,
	fKSeguidor INT,
	Foreign Key (idSeguido) REFERENCES usuario(id),
	Foreign Key (fkSeguidor) REFERENCES usuario(id),
	PRIMARY KEY (idSeguido, fkSeguidor)
);


CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	imagem VARCHAR(300),	
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);
CREATE Table resposta(
	idResposta INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT,
	fk_aviso INT,
	descricao VARCHAR(250),
	Foreign Key (fk_usuario) REFERENCES usuario(id),
	Foreign Key (fk_aviso) REFERENCES aviso(id) ON DELETE CASCADE
);

CREATE TABLE estrelaResposta(
	fk_usuario INT,
	fk_resposta INT,
	estrela INT,
	Foreign Key (fk_usuario) REFERENCES usuario(id),
	Foreign Key (fk_resposta) REFERENCES resposta(idResposta) ON DELETE CASCADE, 
	PRIMARY KEY  (fk_usuario, fk_resposta)
);

CREATE TABLE estrelaPublicacao(
	fkUsuario INT,
	fkAviso INT,
	estrela INT,
	Foreign Key (fkUsuario) REFERENCES usuario(id),
	Foreign Key (fkAviso) REFERENCES aviso(id) on delete CASCADE,
	primary Key (fkUsuario, fkAviso)
);
SELECT * FROM estrelaPublicacao;

-- SELECT 
-- 	a.titulo,
-- 	a.descricao,
-- 	a.imagem AS fotoDesc,
-- 	u.foto AS foto,
-- 	u.nome,
-- 	COUNT(ep.estrela)
--  FROM aviso AS a      
-- 	LEFT JOIN estrelaPublicacao ep ON ep.fkAviso = a.id
-- 	JOIN usuario u ON a.fk_usuario = u.id
-- 	WHERE a.fk_usuario = 1
-- 	GROUP BY a.id;




























    SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            a.imagem AS fotoDesc,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha,
            u.foto,
            COUNT(ep.estrela) AS estrela
        FROM aviso a
        INNER JOIN usuario u ON a.fk_usuario = u.id
        LEFT JOIN estrelaPublicacao ep ON ep.fkAviso = idAviso
		GROUP BY idAviso
		;

		 SELECT 
    r.idResposta AS idResposta,
    r.fk_aviso,
    r.descricao,
    u.id AS idUsuario,
    u.nome,
    u.email,
    u.senha,
    u.foto,
	COUNT(er.estrela) AS Estrela
    FROM resposta r
    INNER JOIN usuario u ON r.fk_usuario = u.id
	LEFT JOIN estrelaResposta er ON er.fk_resposta = idResposta
	GROUP BY idResposta
	;