module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
      recipeImage: DataTypes.STRING,
      recipeTitle: DataTypes.STRING,
      recipeDesc: DataTypes.STRING,
      calories: DataTypes.STRING,
      nutrition: DataTypes.STRING,
      ingredientLines : DataTypes.STRING,
      instructions : DataTypes.STRING,
    });
    return Recipe;
  };

