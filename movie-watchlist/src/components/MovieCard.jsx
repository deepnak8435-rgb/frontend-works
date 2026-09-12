function MovieCard({
  movie,
  onDetails,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isInWatchlist,
}) {

  return (
    <article className="movie-card">

      <div className="poster-container">

        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.Title}
        />

      </div>

      <div className="movie-info">

        <h3>
          {movie.Title}
        </h3>

        <p>
          📅 {movie.Year}
        </p>

        <p>
          🎭 {movie.Genre || "Genre unavailable"}
        </p>

        <p>
          ⭐ {movie.imdbRating !== "N/A"
            ? movie.imdbRating
            : "N/A"}
        </p>

        <div className="movie-actions">

          <button
            onClick={() => onDetails(movie)}
          >
            Details
          </button>

          {isInWatchlist ? (

            <button
              className="remove-btn"
              onClick={() => onRemoveFromWatchlist(movie)}
            >
              − Remove
            </button>

          ) : (

            <button
              className="watchlist-btn"
              onClick={() => onAddToWatchlist(movie)}
            >
              + Watchlist
            </button>

          )}

        </div>

      </div>

    </article>
  );
}

export default MovieCard;