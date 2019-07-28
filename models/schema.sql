DROP DATABASE IF EXISTS recipebox_db;
-- Creates the "recipeBox" database --
CREATE DATABASE recipebox_db;

USE recipebox_db;


-- Creating recipe table --
CREATE TABLE IF NOT EXISTS `recipe` (
  `recipeID` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `recipeImage` VARCHAR( 160 ) NOT NULL,
  `recipeTitle` VARCHAR( 255) NOT NULL,
  `recipeDesc` VARCHAR(48) NOT NULL,
  `calories` VARCHAR ( 8 ), --should be an INT
  `nutrition` VARCHAR ( 240 ),
  `instructions` VARCHAR ( 3000 ) NOT NULL,

  PRIMARY KEY ( `recipeID` ) 
);

-- creating ingredients table --
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

-- Creating recipeBox table --
CREATE TABLE IF NOT EXISTS 'recipeBox' (
  `userID` INT,
  `recipeID` INT,

  FOREIGN KEY ( `userID` ) REFERENCES `accounts`( `userID`),
  FOREIGN KEY ( `recipeID` ) REFERENCES `recipe`( `recipeID` )

);


INSERT INTO `accounts` (`email`, `password`) VALUES ('test@test.com', 'test');
