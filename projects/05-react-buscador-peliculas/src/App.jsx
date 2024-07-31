import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import { useState, useCallback } from "react";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    updateSearch(value);
    debouncedGetMovies(value);
  };

  return (
    <>
      <div className="container">
        <header>
          <h1>Movie Search</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={search}
              className="input"
              placeholder="Avengers, Star Wars, The Matrix..."
            />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type="submit">Search</button>
          </form>
          {error && (
            <p style={{ color: "red" }} className="error">
              {error}
            </p>
          )}
        </header>

        <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
      </div>
    </>
  );
}

export default App;
