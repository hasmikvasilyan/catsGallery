function Filters({ categories, changeOption, selectedCategory }) {
  const handleClick = (e) => {
    changeOption(e.target.id);
  };

  return (
    <div className="categories">
      {categories.map((category) => {
        return (
          <button
            className={`btn ${
              +selectedCategory === category.id ? "selected" : ""
            }`}
            type="button"
            key={category.id}
            value={category.name}
            onClick={handleClick}
            id={category.id}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

export default Filters;
