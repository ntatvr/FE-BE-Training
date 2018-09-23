Function:
- send mail
- table CRUD

- Database: MySQL

- express js
- useing ejs to render html

Q: How to install nodemon?
1. Install nodemon with this command:
- npm install -g nodemon

2. Start server with this command:
- nodemon run start


// Create user table
CREATE TABLE `nodejs-training`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `isActive` TINYINT NOT NULL,
  PRIMARY KEY (`iduser`));

ALTER TABLE `nodejs-training`.`user` 
CHANGE COLUMN `name` `username` VARCHAR(45) NOT NULL ;
