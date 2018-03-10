$(document).ready(function() {

	//array for Disney characters to use search terms and to label dynamic buttons
	var topics = [
		"Mickey Mouse", "Donald Duck", "Goofy", "Minnie Mouse", "Cruella de Vil",
		"Snow White", "Simba", "Peter Pan", "Pinocchio", "Dumbo",
		"Jack Sparrow", "Cinderella", "Roger Rabbit", "Tinker Bell", "Pluto",
		"Wreck-It Ralph", "Ariel", "Chicken Little", "Nemo", "Mary Poppins"
	];



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

				//Setting variables to pull rating
				var rating = results[i].rating;

				//Set variable for animated image 
				var animatedImage = results[i].images.fixed_height.url;

				//And set variable for still image
				var staticImage = results[i].images.fixed_height_still.url;

				//variable to generate images on web page
				var showImage = $("<img>");

				//variable to show rating
				var p = $("<p>").text("Rating: " + rating);

				//Adding "data-state", "data-still" and "data-animate" attributes
				showImage.attr("src", staticImage);

				showImage.addClass("disneyGiphy");

				showImage.attr("data-state", "still");

				showImage.attr("data-still", staticImage);

				showImage.attr("data-animate", animatedImage);

				//Append rating paragraph to each gif
				showDisney.append(p);

				showDisney.append(showImage);

				$("#disney-characters").prepend(showDisney);

			}
		});
	}

	//Function to add Disney character through form
	$("#addDisney").on("click", function(event) {

		//Prevents default action from taking if not done explicitly
		event.preventDefault();

		//Creates character from text entered into form; removes whitespace
		var newCharacter = $("#disney-input").val().trim();

		//Adds new character to topics array
		topics.push(newCharacter);

		//Assigns value from text entered
		$("#disney-input").val('');

		//Fuctions creates and appends new button to disney buttons div
		showButtons();
	});


	//create dynamic buttons
	function showButtons() {

		$("#disney-buttons").empty();

		//loop over topics array to create buttons
		for (var i = 0; i < topics.length; i++) {

			//set variable to create dynamic buttons
			var makeButton = $('<button>');

			//add attributes for each button
			makeButton.attr("class", "character");

			//set data-search attribute to run searches from AJAX request 
			makeButton.attr("data-search", topics[i]);

			//create labels for buttons
			makeButton.text(topics[i]);

			//Append buttons to disney-buttons div	
			$("#disney-buttons").append(makeButton);
		}
	}

	//Function to create buttons
	showButtons();

	//Click on the character buttons to populate the div with Disney character of your choice
	$(document).on("click", ".character", showDisneyCharacter);

	//On click event to animate and pause gifs
	$(document).on("click", ".disneyGiphy", animatePauseImage);

	//Function animates and pauses gifs status based on data-state
	function animatePauseImage() {

		//Determines current data state status
		var imageState = $(this).attr("data-state");

		//if the image is still, clicking on it will animate it
		if (imageState === "still") {

			$(this).attr("src", $(this).attr("data-animate"));

			$(this).attr("data-state", "animate");

			//otherwise click on image in the animated state to make it static
		} else {

			$(this).attr("src", $(this).attr("data-still"));

			$(this).attr("data-state", "still");
		}
	}

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