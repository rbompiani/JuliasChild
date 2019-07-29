 module.exports = function(app) {
     // Save new Recipe
     app.get("/saveRecipe/", function(req, res) {
        var userEmail = req.session.username;

            db.Accounts.findOne({ where: {email: userEmail} }).then(user => {
                db.RecipeBox.create({ userID: user.userID, recipeID: recipe.recipeID })
                .then((created)=>{
                    res.redirect('/index', 302);
                })
            });
     })
}
