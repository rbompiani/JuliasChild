/* ----------NPM PACKAGE DEPENDENCIES ---------*/
//require express package//
var http = require("http");

var express = require('express');

var db = require('./models');

var bodyParser = require("body-parser");

var exphbs = require("express-handlebars");

var session = require('express-session');

var path = require("path");

/* ----------INSTANTIATE MODULES ---------*/
//run express//
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

//use the body parser//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use handlebars//
//app.engine("handlebars", exphbs({ defaultLayout: "main", extname: '.handlebars' }));
//app.set('views', path.join(__dirname, 'views'));


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts')}
));
app.set("view engine", "handlebars");

//use session//
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

/* ----------THESE SHOULD EVENTUALLY MIGRATE TO ROUTES FILES ---------*/

//catch all route//
app.get('/', (req, res) => {
    if (req.session.loggedin) {
		res.redirect('/index');
	} else {
        res.render('signIn', { title: "Welcome to Julia's Child!" });
	}
});

//route to 404//
app.get('/404', (req, res) => {
    res.render('404', { title: "ERROR 404" });
});

//route tocreate new user with signUp//
app.post('/signUp', function(req, res) {
    // get user credentials from form
	var userEmail = req.body.userEmail;
    var userPassword = req.body.userPass;
    
    //if both email and password are present, add an account to the database
	if (userEmail && userPassword) {
        db.Accounts
            .findOrCreate({ where: { email: userEmail }, defaults: { password: userPassword } })
            .then(([user, created]) => {
                console.log(user.get({
                    plain: true
                }))
                if (created) {
                    req.session.loggedin = true;
                    req.session.username = userEmail;
                    res.redirect('/index');
                } else {
                    res.render('signIn', { title: "Welcome to Julia's Child!", userExists:"true" });
                }
            })
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

//change form to login//
app.get('/auth', (req, res) => {
    res.render('signIn', { title: "Welcome to Julia's Child!", login:"true" });
});

//rout to log in user//
app.post('/logIn', function(req, res) {
    // get user credentials from form
	var userEmail = req.body.userEmail;
    var userPassword = req.body.userPass;
    
    //if both email and password are present, add an account to the database
	if (userEmail && userPassword) {
        db.Accounts
            .findOne({where: {email: userEmail, password: userPassword}})
            .then(user => {
                if(user){
                    req.session.loggedin = true;
                    req.session.username = userEmail;
                    res.redirect('/index');
                } else {
                    res.render('signIn', { title: "Welcome to Julia's Child!", login:"true", loginError:"true" });
                }
            })
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

//route to index//
app.get('/index', (req, res) => {
    if(!req.session.loggedin){
        res.redirect('/');
    } else {
        var userEmail = req.session.username;
        db.Accounts.findOne({ where: {email: userEmail} }).then(user => {
            db.RecipeBox.findAll({where: {userID: user.userID}})
            .then((recipeMatches, created)=>{
                var matches=[];
                recipeMatches.forEach(e=>{
                    matches.push(e.recipeID);
                })
                db.Recipe.findAll({where: {recipeID: matches}}).then(recipes=>{
                    recipes.map(recipe=>{
                        recipe.ingredientArray=recipe.ingredients.split(",");
                        recipe.ingredientArray.pop();
                        console.log(recipe.ingredients);
                    })
                   res.render('./index', {
                      title: "Your Recipe Box",
                      data: recipes
                  });
                })
            })
        });      
    }
});

//route to addrecipe//
app.get('/addrecipe', (req, res) => {
    if(!req.session.loggedin){
        res.redirect('/');
    } else {
        res.render('addrecipe', { title: "Add A Recipe" });
    }
});

//should submit-recipe to database//
app.post('/submit-recipe', (req, res) => {
    console.log('storing a recipe...');

    if(!req.session.loggedin){
        res.redirect('/');
    } else {
        var recipeImage=("/images/fooddefault.jpeg");
        if(req.body.recipeImage){
            recipeImage = req.body.recipeImage;
        }
        var recipeTitle = req.body.recipeTitle;
        var recipeDesc = req.body.recipeDesc;
        var instructions = req.body.instructions;
        var ingredientLines = req.body.recipeIngredients;  


    if (recipeTitle && recipeDesc && instructions) {
            db.Recipe
                .findOrCreate({
                    where:
                    {
                        recipeImage: recipeImage,
                        recipeTitle: recipeTitle,
                        recipeDesc: recipeDesc,
                        instructions: instructions,
                        ingredients: ingredientLines
                    
                    }
                })
                .then(([recipe, created]) => {
                    if (!created) {
                        res.send('Something went wrong');
                        res.end();
                    }
                    var userEmail = req.session.username;

                    db.Accounts.findOne({ where: {email: userEmail} }).then(user => {
                        db.RecipeBox.create({ userID: user.userID, recipeID: recipe.recipeID })
                        .then(created=>{
                            res.redirect('/index', 302);
                        })
                    });
                    
                });
        };
    }
})

//route to search API//
require("./routes/apiRoutes")(app);

app.get('/addFavorite/', function(req, res) {
    if(!req.session.loggedin){
        res.redirect('/');
    } else {
        console.log("saving a recipe...");

        db.Recipe
        .findOrCreate({
            where:
            {
                recipeImage: req.query.img,
                recipeTitle: req.query.title,
                recipeDesc: req.query.desc,
                ingredients: req.query.ing
                
            }
        })
        .then(([recipe, created]) => {
            var userEmail = req.session.username;

            db.Accounts.findOne({ where: {email: userEmail} }).then(user => {
                db.RecipeBox.create({ userID: user.userID, recipeID: recipe.recipeID })
                .then((created)=>{
                    console.log("ITWORKED!");
                    res.redirect(302, '/index');
                })
            });
            
        });        
    }
    
 })

app.get('/removeFavorite/:recipeIdx', function(req, res) {
    if(!req.session.loggedin){
        res.redirect('/');
    } else {
        var userEmail = req.session.username;
        console.log(req.params.recipeIdx);
        var recipeIdx = req.params.recipeIdx;

        if (!recipeIdx){
            console.log("aint no index here!", recipeIdx);
        } else {
            console.log("your recipe index is ", recipeIdx);
        }

            db.Accounts.findOne({ where: {email: userEmail} }).then(user => {
                db.RecipeBox.destroy({ where: {userID: user.userID, recipeID: recipeIdx }})
                .then((destroyed)=>{
                    console.log("entry destroyed!");
                })
            });
    }
 })

//route to log out//
app.get('/logOut', (req, res) => {
    req.session.loggedin = false;
    res.redirect('/');

});


//sync database with sequelize
db.sequelize.sync().then(function () {

    //------------Uncomment for database starter recipe------//
    // db.Recipe.create(thingToSave).then(function (stuffFromSQL) {
    //     console.log(stuffFromSQL);
    // });

    // var thingToSave = {
    //     title: "Salmon test 2",
    //     recipeImage: "https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Oven-Baked-Salmon-Recipe-2-1200.jpg",
    //     recipeTitle: "Salmon 3",
    //     recipeDesc: "$$$",
    //     calories: "200",
    //     nutrition: "Vegan, gluten free, yada",
    //     ingredientLines: '"1 chicken, about 3.5 to 4 pounds", "1 lemon", "1 blood orange", "1 tangerine or clementine", "Kosher salt", "1/2 cup chicken broth"',
    //     instructions: '"step1", "step2", "step3", "step4"'
    // }
    // db.Recipe.create(thingToSave).then(function (stuffFromSQL) {
    //     console.log(stuffFromSQL);
    // });

    app.listen(PORT, function () {
        console.log("App listening on: http://localhost: " + PORT);

    });
});


