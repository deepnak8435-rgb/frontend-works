import CourseCard from "./courseCard";
function CourseList({ courses }) {
  if (courses.length === 0) {
    return (
      <div className="empty">
        <h2>No courses found</h2>
        <p>Try another search or category.</p>
      </div>
    );
  }
  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
export default CourseList;
