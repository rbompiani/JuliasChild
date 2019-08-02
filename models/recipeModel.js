// Model for the Recipe Table
module.exports = function(sequelize, DataTypes) {

  var Recipe = sequelize.define('Recipe', {
    recipeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      },
      recipeImage: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 160]      
          }
        }
      },
      recipeTitle: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 255]      
          }
        },
        allowNull: false
      },
      recipeDesc: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 80]      
          }
        }
      },
      instructions: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [1, 5000]      
          }
        }
      },
      ingredients: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [1, 5000]      
          }
        }
      }
    });
    return Recipe;

  };

  
