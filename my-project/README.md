Function:
- send mail
- table CRUD

Framework:
- Express JS
- using EJS template engine


Q: How to install and start nodemon?

1. Install libs with this command:
- npm install or npm install -g nodemon

2. Start server with this command:
- nodemon run start

Database: MySQL
// Create user table
CREATE TABLE `nodejs-training`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `isActive` TINYINT NOT NULL,
  PRIMARY KEY (`iduser`));

ALTER TABLE `nodejs-training`.`user` 
CHANGE COLUMN `name` `username` VARCHAR(45) NOT NULL ;
