const MovieCard = ({ movie }) => {
  return (
    <article className="movie-card">
      <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
      <div className="movie-body">
        <header className="movie-header">
          <h3>{movie.title}</h3>
          <span
            className="movie-rating"
            aria-label={`Rating ${movie.rating} out of 5`}
          >
            ⭐ {movie.rating.toFixed(1)} / 5
          </span>
        </header>
        <p>{movie.description}</p>
      </div>
    </article>
  );
};

export default MovieCard;
