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

//build the routes for future use//
// var routes= require("/");
//now use the routes//
// app.use(routes);

//make it listen to express server//
app.listen(PORT, function(){
    console.log("App listening on: http://localhost: " + PORT);

});