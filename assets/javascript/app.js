//-------variables------------------//
var animmovieArray = [	
				"iceage",
				"hotel transylvania",
				"kung fu panda",
				"zootopia",
				"finding nemo",
				"monsters inc",
				"ratatouille",
				"moana",
				"the lion king",
				"bambi"
				];

//-------Global Functions--------//

function createButton(){

	//clear  the buttons div
	$("#buttons-div").empty();

	for (var i = 0, j = animmovieArray.length; i < j ; i++) {
		var newButton = $("<button/>", {	
			'text': animmovieArray[i],
			'class': 'btn btn-primary animmovieButtons',
			'type' : 'button',
			'value' : animmovieArray[i]
			});

			newButton.appendTo("#buttons-div");

		}

}
//-----------------MAIN----------------------------------------//
$(function(){
	createButton();
});

// This .on("click") function will create a new button 
 $("#find-movie").on("click", function(event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();

        // Here we grab the text from the input box
        var movie = $("#movie-input").val();

        //add the new movie to movie array
        animmovieArray.push(movie);

        //call function createButton to create a new button for the movie
        createButton();

    });

 // This .on("click") function will trigger the AJAX Call
 $("#buttons-div").on("click","button", function(){

 		//empty the images-div
 		$("#images-div").empty();

 		console.log("Movie Button has been clicked");

 		console.log("Button clicked is" + $(this).val());

 		var movie = $(this).val();

 		// Here we construct our URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ 
        	movie + "&limit=10&api_key=dc6zaTOxFJmzC";

        // hit the queryURL with $ajax, then take the response data and display it in the div with an id of images 
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

        	var results = response.data;
        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $("<div class='item'>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating);
        		var movieImage = $("<img>");
        		var stillURL = results[i].images.fixed_height_still.url;
        		var animateURL = results[i].images.fixed_height.url;
            	movieImage.attr("src", stillURL);
            	movieImage.attr("class", "gif");
            	movieImage.attr("data-state", "still");
            	movieImage.attr("data-animate", animateURL);
            	movieImage.attr("data-still", stillURL);
            	gifDiv.prepend(movieImage);
            	gifDiv.prepend(p);
           	 	$("#images-div").prepend(gifDiv);

        	}
        });


 });

 //when an image is clicked animate
 $("#images-div").on("click", ".gif",  function() {
 	console.log("image clicked");

 	var state = $(this).attr("data-state");

 	if (state === "still"){
 		console.log("state is still");

 		$(this).attr("src", $(this).attr("data-animate") );
 		$(this).attr("data-state", "animate");
 	}
 	else{
 		console.log("state is animate");
 		$(this).attr("src", $(this).attr("data-still"));
 		$(this).attr("data-state", "still");
 	}

 });
