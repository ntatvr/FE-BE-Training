Functions:
- send mail
- table CRUD
- chatting

Frameworks:
- Express JS
- using EJS template engine
- Socket.io


Q: How to install and start node server?

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


## Note
[nodemon] Internal watch failed: ENOSPC: no space left on device
To solve it: I just run the following command:
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


## Document: https://nodejs.org/dist/latest-v10.x/docs/api/documentation.html