import { useMemo, useState } from "react";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import "./App.css";

const initialMovies = [
  {
    id: "movie-dune",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with the Fremen people while plotting revenge against the conspirators who destroyed his family.",
    posterURL:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
  },
  {
    id: "movie-arcane",
    title: "Arcane",
    description:
      "Sisters Vi and Jinx find themselves on opposing sides of a war between magic and technology in the steam-powered city of Piltover.",
    posterURL:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
  },
  {
    id: "movie-spiderverse",
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales embarks on an epic adventure across the multiverse, discovering a team of Spider-People dedicated to protecting its existence.",
    posterURL:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
  },
];

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [filters, setFilters] = useState({ title: "", rating: 0 });
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 0,
  });
  const [formError, setFormError] = useState("");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      const matchesRating = movie.rating >= filters.rating;
      return matchesTitle && matchesRating;
    });
  }, [movies, filters]);

  const handleTitleFilterChange = (value) => {
    setFilters((current) => ({ ...current, title: value }));
  };

  const handleRatingFilterChange = (value) => {
    const safeValue = Number.isNaN(value) ? 0 : value;
    setFilters((current) => ({
      ...current,
      rating: Math.min(5, Math.max(0, safeValue)),
    }));
  };

  const handleNewMovieChange = (field, value) => {
    setNewMovie((current) => ({ ...current, [field]: value }));
  };

  const handleAddMovie = (event) => {
    event.preventDefault();
    const trimmedTitle = newMovie.title.trim();
    const trimmedDescription = newMovie.description.trim();
    const trimmedPoster = newMovie.posterURL.trim();

    if (!trimmedTitle || !trimmedDescription || !trimmedPoster) {
      setFormError("Please fill in every field before adding a movie.");
      return;
    }

    const ratingValue = Math.min(5, Math.max(0, Number(newMovie.rating) || 0));
    const movieToAdd = {
      id: makeId(),
      title: trimmedTitle,
      description: trimmedDescription,
      posterURL: trimmedPoster,
      rating: ratingValue,
    };

    setMovies((current) => [...current, movieToAdd]);
    setNewMovie({ title: "", description: "", posterURL: "", rating: 3 });
    setFormError("");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">React Hooks Checkpoint</p>
        <h1>Favorite Movies & Shows</h1>
        <p>Filter the list, then add your own recommendations.</p>
      </header>

      <Filter
        title={filters.title}
        rating={filters.rating}
        onTitleChange={handleTitleFilterChange}
        onRatingChange={handleRatingFilterChange}
      />

      <section className="dashboard">
        <div className="list-column">
          <h2>Watchlist</h2>
          <MovieList movies={filteredMovies} />
        </div>

        <form className="add-form" onSubmit={handleAddMovie}>
          <h2>Add a new title</h2>
          <label>
            Title
            <input
              type="text"
              value={newMovie.title}
              onChange={(event) =>
                handleNewMovieChange("title", event.target.value)
              }
              placeholder="Enter a movie or show"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={newMovie.description}
              onChange={(event) =>
                handleNewMovieChange("description", event.target.value)
              }
              placeholder="Why should we watch it?"
              rows={4}
              required
            />
          </label>

          <label>
            Poster URL
            <input
              type="url"
              value={newMovie.posterURL}
              onChange={(event) =>
                handleNewMovieChange("posterURL", event.target.value)
              }
              placeholder="https://example.com/poster.jpg"
              required
            />
          </label>

          <label>
            Rating (0-5)
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={newMovie.rating}
              onChange={(event) =>
                handleNewMovieChange("rating", Number(event.target.value))
              }
              required
            />
          </label>

          {formError && <p className="form-error">{formError}</p>}

          <button type="submit">Add movie</button>
        </form>
      </section>
    </div>
  );
}

export default App;
