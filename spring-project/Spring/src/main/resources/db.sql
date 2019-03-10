CREATE SCHEMA `spring-mvc` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
CREATE TABLE `spring-mvc`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `address` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));