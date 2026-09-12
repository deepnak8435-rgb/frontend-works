import { useState } from "react";

function SearchBar({ onSearch }) {

  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    onSearch(query.trim());
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        value={query}
        placeholder="Search for a movie..."
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <button type="submit">
        Search
      </button>

    </form>
  );
}

export default SearchBar;