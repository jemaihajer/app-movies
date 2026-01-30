const Filter = ({ title, rating, onTitleChange, onRatingChange }) => {
  return (
    <section className="filter-panel">
      <label className="filter-field">
        <span>Search by title</span>
        <input
          type="text"
          placeholder="e.g. Inception"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
      </label>

      <label className="filter-field">
        <span>Minimum rating</span>
        <input
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={rating}
          onChange={(event) => onRatingChange(Number(event.target.value))}
        />
      </label>
    </section>
  );
};

export default Filter;
