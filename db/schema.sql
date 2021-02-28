--- load with 
--- sqlite3 database.db < schema.sql
DROP TABLE user;
DROP TABLE score;
CREATE TABLE user (
	user VARCHAR(20) PRIMARY KEY,
	password VARCHAR(20) NOT NULL,
	bday DATE
);
CREATE TABLE score (
	username VARCHAR(20) REFERENCES user(username) ON UPDATE CASCADE ON DELETE CASCADE,
	score INTEGER DEFAULT 0
);
