function RecipeDetails({ recipe, closeDetails, addToShoppingList}) 
{
  return (
    <div className="details">

      <button onClick={closeDetails}>
        ✕ Close
      </button>

      <img
        src={recipe.image}
        alt={recipe.name}
      />

      <h2>{recipe.name}</h2>

      <p>
        Cooking Time: {recipe.cookTimeMinutes} minutes
      </p>

      <h3>Ingredients</h3>

      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <button
        onClick={() =>
          addToShoppingList(recipe.ingredients)
        }
      >
        🛒 Add Ingredients to Shopping List
      </button>

      <h3>Instructions</h3>

      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>
            {instruction}
          </li>
        ))}
      </ol>

    </div>
  );
}

export default RecipeDetails;