  
  // Model for the Ingredients Table
  module.exports = function(sequelize, DataTypes) {

    var Ingredients = sequlelize.define('Ingredients', {
      ingredientID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ingredientLines: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [1, 80]      
          }
        },
        allowNull: false
      },
      recipeID: {
        type: Sequelize.INTEGER,
        references: {
          model: Recipe,
          key: 'recipeID'
        }
      }  
    });
    return Ingredients;
  }