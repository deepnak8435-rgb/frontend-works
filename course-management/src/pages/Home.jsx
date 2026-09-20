import { useEffect, useState } from "react";
import coursesData from "../data/courses";
import CourseList from "../components/courseList";

function Home() {

  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");

  useEffect(() => {
    setCourses(coursesData);
  }, []);

  let filteredCourses = courses.filter((course) => {

    const matchesSearch =
      course.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      course.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "price-low") {
    filteredCourses.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    filteredCourses.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating-high") {
    filteredCourses.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div>

      <section className="hero">

        <h1>Explore Our Courses</h1>

        <p>
          Learn new skills and build your career.
        </p>

      </section>

      <section className="controls">

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Web Development">
            Web Development
          </option>
          <option value="Programming">
            Programming
          </option>
          <option value="Design">
            Design
          </option>
          <option value="Marketing">
            Marketing
          </option>
          <option value="Data Science">
            Data Science
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-low">
            Price: Low to High
          </option>
          <option value="price-high">
            Price: High to Low
          </option>
          <option value="rating-high">
            Highest Rating
          </option>
        </select>

      </section>

      <CourseList courses={filteredCourses} />

    </div>
  );
}

export default Home;