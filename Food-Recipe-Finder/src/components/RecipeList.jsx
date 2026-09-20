import RecipeCard from "./RecipeCard";
function RecipeList({recipes,favorites,toggleFavorite,setSelectedRecipe})
 {
  if (recipes.length === 0) {
    return <p className="message">No recipes found.</p>;
  }
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          setSelectedRecipe={setSelectedRecipe}
        />
      ))}
    </div>
  );
}
export default RecipeList;