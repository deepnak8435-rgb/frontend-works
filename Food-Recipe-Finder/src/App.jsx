import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import ShoppingList from "./components/ShoppingList";
import "./App.css";
function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [shoppingList, setShoppingList] = useState(() => {
    const savedList = localStorage.getItem("shoppingList");
    return savedList ? JSON.parse(savedList) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const toggleFavorite = (recipe) => {
    const alreadyFavorite = favorites.find((item) => item.id === recipe.id);
    if (alreadyFavorite) {
      setFavorites(favorites.filter((item) => item.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };
  const addToShoppingList = (ingredients) => {
    setShoppingList((previousList) => {
      const newIngredients = ingredients.filter(
        (ingredient) => !previousList.includes(ingredient),
      );
      return [...previousList, ...newIngredients];
    });
  };
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || recipe.mealType.includes(category);
    return matchesSearch && matchesCategory;
  });
  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>🍴 Food Recipe Finder</h1>
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter category={category} setCategory={setCategory} />
        {loading && <p className="message">Loading recipes...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <RecipeList
            recipes={filteredRecipes}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setSelectedRecipe={setSelectedRecipe}
          />
        )}
        {selectedRecipe && (
          <RecipeDetails
            recipe={selectedRecipe}
            closeDetails={() => setSelectedRecipe(null)}
            addToShoppingList={addToShoppingList}
          />
        )}
        <ShoppingList
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
        />
      </main>
    </div>
  );
}

export default App;
