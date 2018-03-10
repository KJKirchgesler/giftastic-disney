$( document ).ready(function() {
 
 	//array for Disney characters to use search terms and to label dynamic buttons
	var topics = [
		"Mickey Mouse", "Donald Duck", "Goofy", "Minnie Mouse", "Cruella de Vil", 
		"Snow White", "Simba", "Peter Pan", "Pinocchio", "Dumbo",
		"Jack Sparrow", "Cinderella", "Roger Rabbit", "Tinker Bell", "Pluto",
		"Wreck-It Ralph", "Ariel", "Chicken Little", "Nemo", "Mary Poppins"];



  
    //Function with AJAX call to GIPHY to pull gif data
    function showDisneyCharacter() {  

    var dataFeed = $(this).data("search");
	console.log(dataFeed);

	//Setting parameter for API link set to search term, limit 10 results
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dataFeed + "&api_key=lF6uGhoS3545FH4jQuqMGSMzy1xJCsFR&limit=10";
    

      //HTTP request
      $.ajax({
        url: queryURL,
        method: "GET"
      })

        //our promise
        .then(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {
        	
        	//Create div with still and animate image sources 
        	var showDisney = $("<div id='disney-characters'>");

        	//Setting variables for rating, and animated and still images
        	var rating = results[i].rating;
        	var animatedImage = results[i].images.fixed_height.url;
        	var staticImage = results[i].images.fixed_height_still.url;
        	var showImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	//Adding "data-state", "data-still" and "data-animate" attributes
        	showImage.attr("src", staticImage);
        	showImage.addClass("disneyGiphy");
        	showImage.attr("data-state", "still");
        	showImage.attr("data-still", staticImage);
        	showImage.attr("data-animate", animatedImage);
        	showDisney.append(p);
        	showDisney.append(showImage);
        	$("#disney-characters").prepend(showDisney);

        }
	});
}


   	function showButtons() {
    $("#disney-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var makeButton = $('<button>');
      makeButton.attr("class", "character");
      makeButton.attr("data-search", topics[i]);
      makeButton.text(topics[i]);
      $("#disney-buttons").append(makeButton);
    }
  }


  showButtons();    	
          	
   //Click on of the character buttons to populate the div with Disney character of your choice
  $(document).on("click", ".character", showDisneyCharacter);        



});




//Pseudocode
//generate dynamic buttons from js script
//list of buttons are populated from an array
//loop over array to create dynamic buttons
	//each button queries GIPHY API of a particular Disney character
	//clicking on a button to pull 10 images from Giphy API	
	//initally loaded gifs are still
	//Each gif has a rating
	//Click on a gif to make it animate
	//Click again to make image still
//Create a form that inputs text representing a Disney character
//Submitting a value will:
	//generate a dynamic button
	//query the Giphy API for that character
	//pull 10 still gifs of that character
	//each gif has a rating
	//clicking on a gif will animate it
	//clicking it again will make it still