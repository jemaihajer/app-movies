import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  if (!movies.length) {
    return <p className="empty-state">No movies match your filters yet.</p>;
  }

  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
};

export default MovieList;
