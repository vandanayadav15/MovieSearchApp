import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  // Declaring state variables using useState hook
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Event handler for input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Event handler for search button click
  const handleSearchClick = () => {
    if (searchTerm === "") {
      alert("Please enter a movie title to search");
      return;
    }
    setIsLoading(true);
    const apiKey = "4d7c432a";
    // Fetching movie data from  API using provided API key and search term
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Updating search results state with retrieved data and setting loading state to false
        if (data.Response === "False") {
          // handle error, display error message to user
          alert("please enter valid Movie Title");
        } else {
          setSearchResults(data.Search);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setSearchResults([]);
        setIsLoading(false);
      });
  };
  // Rendering component JSX
  return (
    <div className="movie-search">
      <a href="/">
        <h1 className="heading">Movie App</h1>
      </a>
      <div className="search-container">
        <p className="title">Search For Movies By Their Title</p>
        <input
          className="search-input"
          placeholder="Search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn" onClick={handleSearchClick}>
        Search
      </button>
      <p className="movie-title">Movie Results For `{searchTerm}`</p>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="App">
          {searchResults.map((movie) => (
            <div key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <p>Titile : {movie.Title}</p>
              <p>Year : {movie.Year}</p>
              <p>Type : {movie.Type}</p>
              <Link to={`/moviedetails/${movie.imdbID}`}>
                <button className="btn1">More details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
