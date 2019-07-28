// Model for the RecipeBox Table

// Model for the RecipeBox model

Module.exports = function(Sequelize, DataTypes) {
    var RecipeBox = sequelize.define('RecipeBox', {
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: Accounts,
                key: 'userID'
            }
        },
        recipeID: {
            type: Sequelize.INTEGER,
            references: {
                model: Recipe,
                key: 'recipeID'
            }
        }
    });
    return RecipeBox;
}



