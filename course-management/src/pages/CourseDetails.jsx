import { Link, useParams } from "react-router-dom";
import courses from "../data/courses";
function CourseDetails() {
  const { id } = useParams();
  const course = courses.find((course) => course.id === Number(id));
  if (!course) {
    return (
      <div className="empty">
        <h2>Course Not Found</h2>
        <Link to="/">Back to Courses</Link>
      </div>
    );
  }
  return (
    <div className="details-page">
      <img src={course.image} alt={course.name} />
      <div className="details-content">
        <span className="category"> {course.category}</span>
        <h1>{course.name}</h1>
        <p>{course.description} </p>
        <p>
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p>
          <strong>Duration:</strong> {course.duration}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {course.rating}
        </p>
        <h2> ₹{course.price} </h2>
        <Link to={`/enroll/${course.id}`} className="enroll-btn">
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
export default CourseDetails;
