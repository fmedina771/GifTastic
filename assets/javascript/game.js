var animals = ["cat", "dog", "elephant", "snake", "tortoise", "fish", "bird", "ant", "lizard", "frog", "ferret", "rabbit", "kitten", "owl", "tiger", "lion", "hippo"]

function displayButtons() {

    $('#animalButtons').empty();

    for (var i = 0; i < animals.length; i++) {

        
        var b = $('<button>');

        b.addClass("animal btn btn-primary");
        b.attr("data-animal", animals[i]);
        b.text(animals[i]);
        $("#animalButtons").append(b);
    };
};

$("#addAnimal").on("click", function(event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim()
    animals.push(animal);

    displayButtons();
    $('#animal-input').val("");
});

$(document).on("click", ".animal", function() {
    var animalClicked = $(this).attr("data-animal")
    console.log(animalClicked);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalClicked + "&api_key=dc6zaTOxFJmzC&limit=5"

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var animalImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(animalImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifContent").prepend(gifDiv);
                }
            }
        })
    $(document).on("click", "img", function() {
        console.log("gif clicked")

        var state = $(this).attr("data-state")
        console.log(this)

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})

displayButtons();
