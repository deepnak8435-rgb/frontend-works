import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import courses from "../data/courses";
function Enrollment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((course) => course.id === Number(id));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all fields.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Phone number must contain 10 digits.");
      return;
    }
    const enrolledCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const alreadyEnrolled = enrolledCourses.some(
      (item) => item.courseId === course.id,
    );
    if (alreadyEnrolled) {
      setError("You are already enrolled in this course.");
      return;
    }
    const enrollment = {
      courseId: course.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      enrolledAt: new Date().toISOString(),
    };
    localStorage.setItem(
      "enrolledCourses",
      JSON.stringify([...enrolledCourses, enrollment]),
    );
    setSuccess("Successfully enrolled in the course!");
    setTimeout(() => {
      navigate("/my-courses");
    }, 1000);
  };
  return (
    <div className="form-container">
      <h1>Enroll in Course</h1>
      <h2>{course?.name}</h2>
      {error && <p className="error"> {error} </p>}
      {success && <p className="success"> {success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter 10 digit phone number"
        />
        <label>Course</label>
        <input type="text" value={course?.name || ""} readOnly />
        <button type="submit"> Confirm Enrollment</button>
      </form>
    </div>
  );
}
export default Enrollment;
