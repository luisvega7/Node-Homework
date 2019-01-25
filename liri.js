//Stuff that is required.
const dotenv = require("dotenv").config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const fs = require('fs');
const request = require("request");
var moment = require('moment');



//variable for the command.
let command = process.argv[2];


//-----Functions-----
function randomCommand() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        var dataArr = data.split(",");

        randomCommand = dataArr[0];
        searchItem = dataArr[1];
       

        if (randomCommand === 'spotify-this-song') {
            process.argv.push(searchItem);
            spotifyThis();
        }
        if (randomCommand === 'movie-this') {
            process.argv.push(searchItem);
            movieThis(searchItem);

        }
        if (randomCommand === 'concert-this') {
            process.argv.push(searchItem);
            concertThis(searchItem);
        }
    });
}


function movieThis() {
    let movie = process.argv[3];
    if (movie === undefined) { //if no movie is searched, The Witch will populate.
        request("https://www.omdbapi.com/?t=the+witch&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("-------------------------\n" +
                    "No movie was added to the search, but IF you're not afraid of the spooks I recommend : \n" +
                    "\nThe movie title is: " + JSON.parse(body).Title,
                    "\nMovie release date is: " + JSON.parse(body).Year,
                    "\nThe movie was made in: " + JSON.parse(body).Country,
                    "\nThe Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value,
                    "\nThe IMDB movie rating is: " + JSON.parse(body).imdbRating,
                    "\nHere's the list of actors: \n" + JSON.parse(body).Actors + "\n" +
                    "\nThis is the movie's plot: \n" + JSON.parse(body).Plot
                );
            }
        });
    } else { // requesting the information for users searched movie.
        request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (JSON.parse(body).Response != "false") {
                    console.log(
                        "--------------------------\n" +
                        "Your movie search results: \n",
                        "\nThe movie title is: " + JSON.parse(body).Title,
                        "\nMovie release date is: " + JSON.parse(body).Year,
                        "\nThe movie was made in: " + JSON.parse(body).Country,
                        "\nThe Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value,
                        "\nThe IMDB movie rating is: " + JSON.parse(body).imdbRating,
                        "\nHere's the list of actors: \n" + JSON.parse(body).Actors + "\n" +
                        "\nThis is the movie's plot: \n" + JSON.parse(body).Plot
                    );
                } else {
                    console.log("--------------------------\n");
                    console.log("Sorry, cant find the movie you're looking for. Try again!");
                }
            }
        });
    }
}
//function for spotify-this-song. 
function spotifyThis() {
    const spotify = new Spotify(keys.spotify);
    let songName = process.argv[3];
    if (songName === undefined) {
        console.log(
            "Please input a song name!\nMake sure it's in quotes too. Ex: 'song name'"
        )
    }
    else { //error function in case the it has an error
        spotify.search({ type: 'track', query: songName }, function (err, data) {
            if (err) {
                console.log(
                    "______________________________________________________\n" +
                    'Sorry, an error occurred: \n'
                );
                return;
            }
            console.log( //setting the console log structure so that it looks pretty :)
                "______________________________________________________\n" +
                "Song Name: " + data.tracks.items[0].name,
                "\nArtist: " + data.tracks.items[0].artists[0].name,
                "\nAlbum Name: " + data.tracks.items[0].album.name,
                "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify
            );
        });
    }
};


// //Bands in town function 
function concertThis() {
    const bandInfo = process.argv[3];
       request("https://rest.bandsintown.com/artists/" + bandInfo + "/events?app_id=codingbootcamp", function (error,data) {
        try {
            var response = JSON.parse(data.response);
            console.log(data.response);
            if (response.length != 0) {
                console.log(`Upcoming concerts for include: `)
                response.forEach(function (response) {
                    console.log("Venue name: " + response.venue.name);
                    if (response.venue.country == "United States") {
                        console.log("City: " + response.venue.city + ", " + response.venue.region);
                    } else {
                        console.log("City: " + response.venue.city + ", " + response.venue.country);
                    }
                    console.log("Date: " + moment(response.datetime).format('MM/DD/YYYY'));
                    console.log();
                })
            } else {
                console.log("No concerts found.");
            }
        }
        catch (error) {
            console.log("No concerts found.");
        }
    });
}


//function that will display the introductin to the liri app.
function intro() {
    console.log(
        "\nHello, I am Liri!",
        "\nI can do these following commands...",
        "\nspotify-this-song '(song name)'",
        "\nmovie-this '(movie-this)'",
        "\ndo-what-it-says",
        "\nconcert-this"


    )
}



//-commands for the functions
switch (command) {
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'do-what-it-says':
        randomCommand();
        break;
    case 'movie-this':
        movieThis();
        break;
      case 'concert-this':
     concertThis();
         break; 
    case undefined:
        intro();
        break;
}

