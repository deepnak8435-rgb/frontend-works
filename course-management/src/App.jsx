import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import Enrollment from "./pages/Enrollment";
import MyCourses from "./pages/MyCourses";

import "./App.css";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <main>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/course/:id"
            element={<CourseDetails />}
          />

          <Route
            path="/enroll/:id"
            element={<Enrollment />}
          />

          <Route
            path="/my-courses"
            element={<MyCourses/>}
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;
