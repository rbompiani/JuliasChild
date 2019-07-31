module.exports = function(app) {

    
    // Load index page
    app.get("/server.js", function(req, res) {
      if(!req.session.loggedin){
        res.redirect('/');}
        });
      };
      const request = require("request");
     
      const apiKey = "fa82f5e36dddbeae1a09cb7e2df0a6d5";

      const Edamam_API_BASE_URL = `https://api.edamam.com/search?app_key=${apiKey}`;
      
      const BASE_URL_WITH_PARAMETERS = `${Edamam_API_BASE_URL}&q=`;
      
      module.exports = function(app) {
       
        app.get("/api/recipes/:search", function (req, res) {
          if(!req.session.loggedin){
            res.redirect('/');
        } else {
          
          // get the q parameter from the request
          var foo=[];
        //   var array={'test':'vars'};

          const queryParam = req.query.q;
            console.log("message", req.params);
          const search = req.params.search
      
          let url;
      
          
          if (queryParam) {
              url = BASE_URL_WITH_PARAMETERS + queryParam;
              
          } else {
              url = Edamam_API_BASE_URL;
          }
          
          var myURL = `https://api.edamam.com/search?q=${search} &app_id=ff691d51&app_key=fa82f5e36dddbeae1a09cb7e2df0a6d5&from=0&to=6`;

          request(myURL, function(err, edamamRes, body) {
              
              if (err) {
                  throw err;
              }
      
             
             const parsedBody = JSON.parse(body);
             //console.log("is it breaking here?",parsedBody);


               parsedBody.hits.forEach(function (item) {

                  var ingredients = item.recipe.ingredientLines;

                   foo.push({
                      recipeTitle: item.recipe.label,
                      recipeImage: item.recipe.image,
                      ingredientArray: ingredients,
                      recipeDesc: item.recipe.healthLabels,
                      ingredients: item.recipe.ingredientLines
                   });
                  
              });
              res.render("index", {data: foo})
          });
        }
        });
    }
  
      