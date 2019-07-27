DROP DATABASE IF EXISTS recipebox_db;
-- Creates the "recipeBox" database --
CREATE DATABASE recipebox_db;

USE recipebox_db;

CREATE TABLE IF NOT EXISTS `recipe` (
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

CREATE TABLE IF NOT EXISTS `ingredients` (
  `ingredientID` INT( 11 ) AUTO_INCREMENT NOT NULL,
  `ingredientLines` VARCHAR( 80 ) NOT NULL,
  `recipeID` INT,

  PRIMARY KEY ( `ingredientID` ),
  FOREIGN KEY ( `recipeID` ) REFERENCES `recipe`(`recipeID`)
);

-- Creating users table --
CREATE TABLE IF NOT EXISTS `accounts` (
  `userID` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,

  PRIMARY KEY (`userID`)

); 

INSERT INTO `accounts` (`email`, `password`) VALUES ('test@test.com', 'test');
