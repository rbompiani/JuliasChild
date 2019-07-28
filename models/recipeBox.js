// Model for the RecipeBox Table

// Model for the RecipeBox model


module.exports = function(sequelize, DataTypes) {
    var RecipeBox = sequelize.define('RecipeBox', {
        userID: {
            type: DataTypes.INTEGER,
            //references: {
            //    model: Accounts.Accounts,
            //    key: 'userID'
            //}
        },
        recipeID: {
            type: DataTypes.INTEGER,
            //references: {
            //   model: Recipe.Recipe,
            //    key: 'recipeID'
            //}
        }
    });
    return RecipeBox;
}



