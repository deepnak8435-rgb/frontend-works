import { Link } from "react-router-dom";
function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.name} />
      <div className="course-content">
        <span className="category">{course.category}</span>
        <h3>{course.name}</h3>
        <p className="instructor">Instructor: {course.instructor} </p>
        <p>⏱ {course.duration}</p>
        <p>⭐ {course.rating}</p>
        <h3>₹{course.price}</h3>
        <Link className="details-btn" to={`/course/${course.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
export default CourseCard;
