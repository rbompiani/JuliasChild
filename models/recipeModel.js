// Model for the Recipe Table
module.exports = function(sequelize, DataTypes) {

  var Recipe = sequelize.define('Recipe', {
    recipeID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
      },
      recipeImage: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [0, 160]      
          }
        }
      },
      recipeTitle: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [1, 255]      
          }
        },
        allowNull: false
      },
      recipeDesc: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [0, 80]      
          }
        }
      },
      instructions: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [1, 3000]      
          }
        },  
        allowNull: false
      }
    });
    return Recipe;

  };

  
