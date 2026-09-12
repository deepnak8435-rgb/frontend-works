import MovieCard from "./MovieCard";

function MovieList({
  movies,
  onDetails,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  watchlist,
}) {

  if (movies.length === 0) {
    return (
      <section className="empty-state">
        <h2>No movies found</h2>
        <p>
          Try searching for another movie.
        </p>
      </section>
    );
  }

  return (
    <section className="movie-section">

      <h2 className="section-title">
        Movies
      </h2>

      <div className="movie-grid">

        {movies.map((movie) => (

          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onDetails={onDetails}
            onAddToWatchlist={onAddToWatchlist}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            isInWatchlist={watchlist.some(
              (item) => item.imdbID === movie.imdbID
            )}
          />

        ))}

      </div>

    </section>
  );
}

export default MovieList;