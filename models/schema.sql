DROP DATABASE IF EXISTS recipebox_db;
-- Creates the "recipeBox" database --
CREATE DATABASE recipebox_db;

USE recipebox_db;

CREATE TABLE `recipe` (
  `recipeID` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `recipeImage` VARCHAR( 160 ) NOT NULL,
  `recipeTitle` VARCHAR( 255) NOT NULL,
  `recipeDesc` VARCHAR(48) NOT NULL,
  `calories` VARCHAR ( 8 ),
  `nutrition` VARCHAR ( 240 ),
  `cookingTime` VARCHAR(48) NOT NULL,
  `instructions` VARCHAR ( 3000 ) NOT NULL,

  PRIMARY KEY ( `recipeID` ) 
);

CREATE TABLE `ingredients` (
  `ingredientID` INT( 11 ) AUTO_INCREMENT NOT NULL,
  `ingredientLines` VARCHAR( 80 ) NOT NULL,
  `recipeID` INT,

  PRIMARY KEY ( `ingredientID` ),
  FOREIGN KEY ( `recipeID` ) REFERENCES `recipe`(`recipeID`)
);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;