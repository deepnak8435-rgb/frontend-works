function ShoppingList({shoppingList,setShoppingList}) {
const removeIngredient = (ingredient) => 
    {setShoppingList(
shoppingList.filter((item) => item !== ingredient )
    );
  };
  const clearList = () => { setShoppingList([]);
  };
  return (
    <section className="shopping-list">
      <h2>🛒 Shopping List</h2>
      {shoppingList.length === 0 ? (
        <p>Your shopping list is empty.</p>
      ) : (
        <>
          <ul>
            {shoppingList.map((ingredient, index) => (
              <li key={index}>
                <span>{ingredient}</span>
                <button
                  onClick={() =>
                    removeIngredient(ingredient) }>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearList}>
            Clear Shopping List
          </button>
        </>)}
    </section>
     );
}
export default ShoppingList;