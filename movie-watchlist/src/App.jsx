import { useEffect, useMemo, useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Watchlist from "./components/Watchlist";

import { searchMovies } from "./services/moviesApi";

function App() {

  // Movies received from API
  const [movies, setMovies] = useState([]);

  // Selected genre
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Selected movie for details
  const [selectedMovie, setSelectedMovie] =useState(null);

  // Watchlist loaded from localStorage
  const [watchlist, setWatchlist] = useState(() => {

    const savedWatchlist = localStorage.getItem("movieWatchlist");

    return savedWatchlist
      ? JSON.parse(savedWatchlist)
      : [];
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] =useState("");

  // Search message
  const [hasSearched, setHasSearched] = useState(false);

  // --------------------------------
  // Save watchlist to localStorage
  // --------------------------------

  useEffect(() => {
    localStorage.setItem(
      "movieWatchlist",
      JSON.stringify(watchlist)
    );

  }, [watchlist]);


  // --------------------------------
  // Search movies
  // --------------------------------

  const handleSearch = async (query) => {

    try {

      setLoading(true);

      setError("");

      setHasSearched(true);

      setSelectedGenre("All");

      const results =
        await searchMovies(query);

      setMovies(results);

    } catch (error) {

      console.error(error);

      setMovies([]);

      setError(
        error.message ||
        "Something went wrong while fetching movies."
      );

    } finally {

      setLoading(false);

    }
  };


  // --------------------------------
  // Add movie to watchlist
  // --------------------------------

  const handleAddToWatchlist = (movie) => {

    setWatchlist((currentWatchlist) => {

      const alreadyExists =
        currentWatchlist.some(
          (item) =>
            item.imdbID === movie.imdbID
        );

      if (alreadyExists) {
        return currentWatchlist;
      }

      return [
        ...currentWatchlist,
        movie,
      ];
    });
  };


  // --------------------------------
  // Remove movie from watchlist
  // --------------------------------

  const handleRemoveFromWatchlist = (movie) => {

    setWatchlist((currentWatchlist) => {

      return currentWatchlist.filter(
        (item) =>
          item.imdbID !== movie.imdbID
      );

    });
  };


  // --------------------------------
  // Get available genres
  // --------------------------------

  const genres = useMemo(() => {

    const genreSet = new Set();

    movies.forEach((movie) => {

      if (movie.Genre && movie.Genre !== "N/A") {

        movie.Genre
          .split(",")
          .forEach((genre) => {

            genreSet.add(genre.trim());

          });
      }
    });

    return Array.from(genreSet).sort();

  }, [movies]);


  // --------------------------------
  // Filter movies by genre
  // --------------------------------

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) =>
          movie.Genre
            ?.split(",")
            .map((genre) => genre.trim())
            .includes(selectedGenre)
        );


  // --------------------------------
  // Scroll to watchlist
  // --------------------------------

  const showWatchlist = () => {

    document
      .getElementById("watchlist")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  return (
    <div className="app">

      <Navbar
        onWatchlistClick={showWatchlist}
      />

      <main>

        <SearchBar
          onSearch={handleSearch}
        />

        {hasSearched && !loading && !error && (
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        )}

        {loading && (
          <div className="message">
            <p>🎬 Loading movies...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          hasSearched && (

            <MovieList
              movies={filteredMovies}
              onDetails={setSelectedMovie}
              onAddToWatchlist={
                handleAddToWatchlist
              }
              onRemoveFromWatchlist={
                handleRemoveFromWatchlist
              }
              watchlist={watchlist}
            />

          )}

        <Watchlist
          watchlist={watchlist}
          onRemove={
            handleRemoveFromWatchlist
          }
          onDetails={setSelectedMovie}
        />

      </main>


      <MovieDetails
        movie={selectedMovie}
        onClose={() =>
          setSelectedMovie(null)
        }
      />

    </div>
  );
}

export default App;