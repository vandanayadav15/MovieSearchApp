import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieDetails() {
  const { imdbID } = useParams(); // Get the IMDB ID from the router parameter

  // State variables to hold movie data, loading status, and error
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie data from API using IMDB ID as parameter
  useEffect(() => {
    const ApiKey = "4d7c432a";
    fetch(`https://www.omdbapi.com/?apikey=${ApiKey}&i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data); // Set movie data in state
        setIsLoading(false); // Set loading status to false
      })
      .catch((error) => {
        setIsLoading(false); // Set loading status to false
        setError(error); // Set error in state
      });
  }, [imdbID]); // Only run effect when IMDB ID changes

  // Render loading indicator if data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render error message if there was an error fetching data
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render nothing if there is no movie data
  if (!movieData) {
    return null;
  }

  // Render movie details
  return (
    <div className="movie-data">
      <div className="data">
        <a href="/">
          <h1 className="">Movie App</h1>
        </a>
        <h2>Titile : {movieData.Title}</h2>
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <p>Year : {movieData.Year}</p>
      <p>Type : {movieData.Type}</p>
      <p>Directed by : {movieData.Director}</p>
      <p>IMDB rating : {movieData.imdbRating}</p>
      <p>Discription :{movieData.Plot}</p>
    </div>
  );
}

export default MovieDetails;
