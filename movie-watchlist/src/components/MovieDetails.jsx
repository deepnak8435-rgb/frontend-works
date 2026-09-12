function MovieDetails({ movie, onClose }) {

  if (!movie) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="details-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <div className="details-content">

          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster"
            }
            alt={movie.Title}
          />

          <div className="details-info">

            <h2>
              {movie.Title}
            </h2>

            <p>
              <strong>Year:</strong>{" "}
              {movie.Year}
            </p>

            <p>
              <strong>Genre:</strong>{" "}
              {movie.Genre}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              ⭐ {movie.imdbRating}
            </p>

            <p>
              <strong>Runtime:</strong>{" "}
              {movie.Runtime}
            </p>

            <p>
              <strong>Director:</strong>{" "}
              {movie.Director}
            </p>

            <p>
              <strong>Actors:</strong>{" "}
              {movie.Actors}
            </p>

            <h3>Plot</h3>

            <p>
              {movie.Plot}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;