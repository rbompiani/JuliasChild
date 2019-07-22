var token = "fa82f5e36dddbeae1a09cb7e2df0a6d5";
var appID = "ff691d51";
var edamam_url = "https://api.edamam.com/search?";

function get_recipe(queryURL){
    $.ajax({url: queryURL, method: "GET", headers: {Authorization: token}}).done(function(edamam_data){
       console.log(edamam_data);

       for (var i=0; i<edamam_data.hits.length;i++){
        console.log(edamam_data.hits[i].recipe.label);
       }

    }