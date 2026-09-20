import { Heart, ShoppingCart } from "lucide-react";
function Navbar() {
  return (
    <nav className="navbar">
      <h2>🍴 Recipe Finder</h2>
      <div className="nav-links">
        <a href="#recipes"> Recipes</a>
        <a href="#favorites">
          <Heart size={18} />
          Favorites
        </a>
        <a href="#shopping">
          <ShoppingCart size={18} />
          Shopping List
        </a>
      </div>
    </nav>
  );
}
export default Navbar;