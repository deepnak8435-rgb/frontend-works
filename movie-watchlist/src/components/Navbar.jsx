function Navbar({ onWatchlistClick }) {
  return (
    <nav className="navbar">

      <div className="logo">
        🎬 <span>MovieHub</span>
      </div>

      <div className="nav-links">
        <button>
          Home
        </button>

        <button>
          Movies
        </button>

        <button onClick={onWatchlistClick}>
          ❤️ Watchlist
        </button>
      </div>

    </nav>
  );
}

export default Navbar;