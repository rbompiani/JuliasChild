
  // Model for the Ingredients Table
  module.exports = function(sequelize, DataTypes) {

    var Ingredients = sequelize.define('Ingredients', {
      ingredientID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ingredientLines: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 80]      
          }
        },
        allowNull: false
      },
      recipeID: {
        type: DataTypes.INTEGER,
        //references: {
          //model: Recipe.Recipe,
          //key: 'recipeID'
        //}
      }  
    });

    return Ingredients;
  }

