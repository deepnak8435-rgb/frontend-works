import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  if (!API_KEY) {
    throw new Error("OMDb API key is missing.");
  }

  if (!query.trim()) {
    return [];
  }

  try {
    // First request: search movies
    const searchResponse = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: "movie",
      },
    });

    if (searchResponse.data.Response === "False") {
      throw new Error(searchResponse.data.Error);
    }

    const movies = searchResponse.data.Search || [];

    // Second request: get detailed information
    const detailedMovies = await Promise.all(
      movies.map(async (movie) => {
        const detailsResponse = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            i: movie.imdbID,
            plot: "full",
          },
        });

        return detailsResponse.data;
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error(
      "Movie API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};