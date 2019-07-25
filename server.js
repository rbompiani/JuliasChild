//require express package//
var express= require ('express');

var bodyParser= require("body-parser");

var exphbs= require("express-handlebars");

var path= require ("path");

//run express//
var app= express();
var PORT= process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

//use the body parser//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use handlebars//
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//route to index//
app.get('/', (req, res) => {
    
    res.render('signIn', { title: "Welcome to Julias Child!"});
});
//route to 404//
app.get('/404', (req, res) => {
    res.render('404', { title: "ERROR 404"});
});
//route to index//
app.get('/example', (req, res) => {
    res.render('example', { title: "Example Title"});
});
//route to index//
app.get('/index', (req, res) => {
    // ** backend person- replace this info with the DB info // -sam
    var recipes= [
       {
        title: "Burrito Bowl", 
        recipeImage: "https://www.mercurynews.com/wp-content/uploads/2017/07/blog-chipotle-parks-burrito.jpg",
        recipeTitle: "Burrito Bowl",
        recipeDesc: "A healthy option for food",
        calories: "400",
        nutrition: "Vegan, gluten free, yada",
        ingredientLines : [ "1 chicken, about 3.5 to 4 pounds", "1 lemon", "1 blood orange", "1 tangerine or clementine", "Kosher salt", "1/2 cup chicken broth" ],
        instructions: ["step1", "step2", "step3", "step4"]
        },
        {
        title: "Salmon", 
        recipeImage: "https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Oven-Baked-Salmon-Recipe-2-1200.jpg",
        recipeTitle: "Salmon",
        recipeDesc: "A healthy option for food",
        calories: "200",
        nutrition: "Vegan, gluten free, yada",
        ingredientLines : [ "1 chicken, about 3.5 to 4 pounds", "1 lemon", "1 blood orange", "1 tangerine or clementine", "Kosher salt", "1/2 cup chicken broth" ],
        instructions: ["step1", "step2", "step3", "step4"]
        }
    ]
    res.render('index', { 
        data: recipes
    });
});
// make a route to "likes" for the #heartImage (check out bamazon assingment)
//app.post("/api/:ID") "update product where id=id" or (subtract from inventory on the bamazon)
//look into sorting function on the database stuff ie "Most liked recipes"


//make it listen to express server//
app.listen(PORT, function(){
    console.log("App listening on: http://localhost: " + PORT);

});