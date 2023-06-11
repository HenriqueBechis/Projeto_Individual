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
	instrumento VARCHAR(20),
	foto VARCHAR(300)
);

SELECT foto FROM usuario WHERE id = 1;
SELECT * FROM usuario;

 UPDATE usuario SET instrumento = 'efefe' WHERE id = 1;
CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	imagem VARCHAR(300),
	estrela INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);
ALTER TABLE aviso ADD COLUMN estrela INT;
SELECT * FROM aviso;
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
