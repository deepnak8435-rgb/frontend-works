import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">CourseHub</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Courses</Link>
        <Link to="/my-courses">My Courses</Link>
      </div>
    </nav>
  );
}
export default Navbar;