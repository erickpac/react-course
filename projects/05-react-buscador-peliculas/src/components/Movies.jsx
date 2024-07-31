function ListOfMovies({ movies }) {
  return (
    <section className="movies">
      {movies.map((movie) => (
        <article key={movie.id} className="movie">
          <img src={movie.poster} alt={movie.title} className="movie__poster" />
          <div className="movie__info">
            <h2 className="movie__title">{movie.title}</h2>
            <p className="movie__description">{movie.year}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function NoMovies() {
  return <p>No movies found</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies && movies.length > 0;

  return (
    <main>{hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />}</main>
  );
}
