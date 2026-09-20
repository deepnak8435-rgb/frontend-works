import { useEffect, useState } from "react";
import courses from "../data/courses";
import CourseCard from "../components/courseCard";
function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  useEffect(() => {
    const enrolled = JSON.parse( localStorage.getItem("enrolledCourses")) || [];
    const enrolledCourseData = enrolled.map((item) =>courses.find(
    (course) => course.id === item.courseId ) ).filter(Boolean);
    setMyCourses(enrolledCourseData);
  }, []);
return (
    <div className="my-courses">
      <h1>My Courses</h1>
      {myCourses.length === 0 ? (
        <div className="empty">
          <h2>No courses enrolled yet.</h2>
          <p>Explore our courses and enroll in one. </p>
        </div>
      ) : (
        <div className="course-grid">
          {myCourses.map((course) => (
            <CourseCard key={course.id} course={course} />))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;