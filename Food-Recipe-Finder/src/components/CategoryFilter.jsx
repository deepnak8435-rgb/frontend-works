function CategoryFilter({ category, setCategory }) {

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert"
  ];

  return (
    <div className="categories">

      {categories.map((item) => (
        <button
          key={item}
          className={category === item ? "selected" : ""}
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;