CREATE TABLE `classicmodels`.`crawler` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uri` LONGTEXT NOT NULL,
  `title` LONGTEXT NOT NULL,
  `image` LONGTEXT NULL,
  `reader` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reply` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdDate` DATETIME NOT NULL,
  `updatedDate` DATETIME NULL,
  `isActive` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;
