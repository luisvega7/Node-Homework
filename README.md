LIRI Bot This is a command line app that queries the spotify API, OMDB API and Bands in Town API and neatly returns to users information about their requested film, band, or movie.Commands The following are the commands that are applicable to this app.

spotify-this-song By running

node liri.js spotify-this-song you will be presented with the song name, artist, album, and a preview link for your requested song. Song is an optional argument, but if no song is specified, LIRI will default to All Star –– Smash Mouth. This queries the Spotify node API to return this information to the user. If a song is not found, the user will be notified that it cannot be found.


concert-this By running
node liri.js concert-this you will be presented with the upcoming concerts venues, cities, and dates for approaching concerts for a chosen artist. Band is an optional argument, but if no band is specified, LIRI will default to BROCKHAMPTION. This queries the Bands in Town Events API using Request to return this information to the user. If no upcoming concerts for a specific band are found, the user will be notified of this.


movie-this By running
node liri.js movie-this you will be presented with the movie title, year, IMDB and Rotten Tomatoes ratings (given they are returned by the API), country, language, plot, and actors for the selected movie. Movie is an optional argument, but if no movie is specified, LIRI will default to Mr. Nobody. This queries the OMDB API using Request to return this information to the user. If the movie cannot be found, the user will be presented with an error message.

do-what-it-says By running
node liri.js do-what-it-says LIRI Bot will run spotify-this-song for I Want it That Way. It reads the file random.txt and processes the commands in it (spotify-this-song, I Want it That Way) and runs it.


command not found If the command is not one of the ones specified above, the program will print a menu like so:


Built With node.js - Javascript runtime environment Request - For calling Bands in Town & OMDB APIs Moment - Used for date formatting Chalk - For colors in terminal Node Spotify API - For spotify-this-song feature Bands in Town Events API - For concert-this feature OMDB API - For movie-this feature
