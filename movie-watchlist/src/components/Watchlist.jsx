function Watchlist({
  watchlist,
  onRemove,
  onDetails,
}) {

  return (
    <section
      className="watchlist-section"
      id="watchlist"
    >

      <h2>
        ❤️ My Watchlist
      </h2>

      {watchlist.length === 0 ? (

        <div className="empty-watchlist">

          <p>
            Your watchlist is empty.
          </p>

          <p>
            Search for movies and click
            "+ Watchlist" to add them.
          </p>

        </div>

      ) : (

        <div className="movie-grid">

          {watchlist.map((movie) => (

            <article
              className="movie-card"
              key={movie.imdbID}
            >

              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.Title}
              />

              <div className="movie-info">

                <h3>
                  {movie.Title}
                </h3>

                <p>
                  📅 {movie.Year}
                </p>

                <p>
                  🎭 {movie.Genre}
                </p>

                <p>
                  ⭐ {movie.imdbRating}
                </p>

                <div className="movie-actions">

                  <button
                    onClick={() => onDetails(movie)}
                  >
                    Details
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => onRemove(movie)}
                  >
                    − Remove
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}

export default Watchlist;