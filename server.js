//require express package//
var express= require ('express');

var bodyParser= require("body-parser");

var exphbs= require("express-handlebars");

//run express//
var app= express();
var PORT= process.env.PORT || 3000;

//use the body parser//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use handlebars//
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//route to index//
app.get('/', (req, res) => {
    res.render('signIn');
});
//route to 404//
app.get('/404', (req, res) => {
    res.render('404');
});
//route to index//
app.get('/example', (req, res) => {
    res.render('example');
});
//route to index//
app.get('/index', (req, res) => {
    res.render('index');
});


//make it listen to express server//
app.listen(PORT, function(){
    console.log("App listening on: http://localhost: " + PORT);

});