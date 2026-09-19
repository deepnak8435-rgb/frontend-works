import { Heart, Clock } from "lucide-react";
function RecipeCard({recipe,favorites,toggleFavorite,setSelectedRecipe}) 
{
  const isFavorite = favorites.find(
    (item) => item.id === recipe.id
  );
  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.name} />
      <div className="recipe-content">
        <h2>{recipe.name}</h2>
        <p>  Category: {recipe.mealType.join(", ")}</p>
        <p className="time">
          <Clock size={16} />
          {recipe.cookTimeMinutes} minutes
        </p>
        <div className="card-buttons">
          <button onClick={() => setSelectedRecipe(recipe)}>
            View Recipe
          </button>

          <button
            className={isFavorite ? "favorite active" : "favorite"}
            onClick={() => toggleFavorite(recipe)}>
            <Heart
              size={18}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
