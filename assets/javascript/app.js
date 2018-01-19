// Topics array to hold TV Show buttons 
var topics = ["Fresh Prince", "Game of Thrones", "Friends", "Parks and Rec", "New Girl", "Brooklyn99", "Silicon Valley", "Grace and Frankie", "How I Met Your Mother", "Westworld", "Stranger Things", "This Is Us", "Entourage", "Seinfeld", "The Simpsons", "Family Matters", "That 70's Show", "Outlander", "The Walking Dead", "Big Little Lies", "Big Bang Theory"];

// renderButtons function to create TV Show buttons
// creates a button for each TV Show in the topics array
// grab title input and remove any spaces
function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var noSpaces = topics[i].replace(/ /g, '+');
        $("#buttons").append('<button type="button" class="btn btn-default tvButton" data-title=' + noSpaces + '>' + topics[i] + '</button>');
    }

    // jquery click handler for TV Show button
    // empty out the gifs container
    // AJAX call to giphy API for tv show clicked
    $(".tvButton").on("click", function() {
        $("#gifs").empty();
        var tvShow = $(this).attr("data-title");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=YnovwKA47pASDe8JvModnuNKkkGiz1CC&limit=10&rating=pg";

        // GET information for tvshow and append into appropriate divs
        // use still images on load - user can later click to see gif
        $.ajax({ url: queryURL, method: "GET" })

            .done(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("#gifs");
                    var itemDiv = $("<div class='col-md-3'>")
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var tvGif = $('<img class="gifImage" data-state="still">');
                    tvGif.attr("src", results[i].images.fixed_height_small_still.url);
                    tvGif.attr("data-animate", results[i].images.fixed_height_small.url);
                    tvGif.attr("data-still", results[i].images.fixed_height_small_still.url);

                    itemDiv.append(tvGif);
                    itemDiv.append(p);
                    gifDiv.prepend(itemDiv);

                }

            });

    });

}

renderButtons();

// when user clicks a still image, load the animated gif
// when user clicks an animated gif, load the still image
$(document.body).on("click", ".gifImage", function() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    else if (state === 'animate') {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

// when user fills out new tv show and clicks submit
// create a new button and push it into the topics array
$("#submit").on("click", function(event) {
    event.preventDefault();
    var newButton = $("#newShow").val();
    topics.push(newButton);
    renderButtons();
    $("#newShow").val("");
});