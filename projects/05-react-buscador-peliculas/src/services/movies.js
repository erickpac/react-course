const API_KEY = "c6628210";

export async function searchMovies({ search }) {
  if (search === "") return [];

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Response === "False") return [];

    const movies = data.Search;

    return movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error fetching movies");
  }
}
