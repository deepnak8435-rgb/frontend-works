function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="genre-filter">

      <label htmlFor="genre">
        Filter by Genre:
      </label>

      <select
        id="genre"
        value={selectedGenre}
        onChange={(event) => {
          onGenreChange(event.target.value);
        }}
      >

        <option value="All">
          All
        </option>

        {genres.map((genre) => (
          <option
            key={genre}
            value={genre}
          >
            {genre}
          </option>
        ))}

      </select>

    </div>
  );
}

export default GenreFilter;