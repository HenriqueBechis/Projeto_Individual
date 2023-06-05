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
	CPF CHAR(11)
);
SELECT * FROM usuario;


CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);
SELECT * FROM aviso;
CREATE Table resposta(
	idResposta INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT,
	fk_aviso INT,
	descricao VARCHAR(250),
	Foreign Key (fk_usuario) REFERENCES usuario(id),
	Foreign Key (fk_aviso) REFERENCES aviso(id) ON DELETE CASCADE
);

DROP TABLE resposta;
select * from resposta;
SELECT 
		r.descricao,
        u.id AS idUsuario,
        u.nome,
        u.email,
        u.senha
        FROM resposta r
            INNER JOIN usuario u
                ON r.fk_usuario = u.id;