//import { type } from "os";

$("#heartImage").on("click", function (){
    console.log("heart was clicked");
});

//ajax request using jquery or fetch or axios


// "form submit intiates"
$('#search-button').on('click',function(){
    event.preventDefault();
       const searchTerm = $('#searchContainer .search-txt').val()
       console.log(searchTerm);
        
        $.ajax({
            url:`/api/recipes/${searchTerm}`,
           type: "GET",
        
        });
        
    }) ;



