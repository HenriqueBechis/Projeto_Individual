-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE musica;
USE musica;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	idade INT,
	sexo VARCHAR(10),
	instrumento VARCHAR(20)
);
SELECT * FROM usuario;
CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

-- DELETE FROM resposta WHERE idResposta =;
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
-- DROP TABLE estrelaResposta;
-- SELECT * FROM estrelaResposta;

--   SELECT 
--     r.idResposta AS idResposta,
--     r.fk_aviso,
--     r.descricao,
--     u.id AS idUsuario,
--     u.nome,
--     u.email,
--     u.senha,
-- 	COUNT(er.estrela) AS Estrela
--     FROM resposta r
--     INNER JOIN usuario u ON r.fk_usuario = u.id
-- 	JOIN estrelaResposta er ON er.fk_resposta = idResposta
-- 	GROUP BY idResposta;
-- 	;
-- 	SELECT * FROM 