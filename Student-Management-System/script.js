// STUDENTS ARRAY
const students = [];
// GET FORM ELEMENT
const studentForm = document.getElementById("studentForm");
// GET INPUT ELEMENTS
const studentNameInput = document.getElementById("studentName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const courseInput = document.getElementById("course");
const marksInput = document.getElementById("marks");
// GET TABLE BODY
const studentTableBody = document.getElementById("studentTableBody");
// CALCULATE GRADE
function calculateGrade(marks) {
  if (marks >= 90) {
    return "A+";
  } else if (marks >= 80) {
    return "A";
  } else if (marks >= 70) {
    return "B";
  } else if (marks >= 60) {
    return "C";
  } else if (marks >= 50) {
    return "D";
  } else {
    return "F";
  }
}
// FORM SUBMIT EVENT
studentForm.addEventListener("submit", function (event) {
  // Prevent page refresh
  event.preventDefault();
  // GET VALUES FROM FORM
  const name = studentNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const course = courseInput.value;
  const marks = Number(marksInput.value);
  // CALCULATE GRADE
  const grade = calculateGrade(marks);
  // CREATE STUDENT OBJECT
  const student = { name, email, phone, course, marks, grade };

  // ADD STUDENT TO ARRAY
  students.push(student);
  // Check the array
  console.log(students);
  // CREATE TABLE ROW
  const row = document.createElement("tr");

  // ADD STUDENT DATA TO ROW
  row.innerHTML = `
     <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.course}</td>
        <td>${student.marks}</td>
        <td>${student.grade}</td>
        <td>
            <button>Edit</button>
            <button>Delete</button>
        </td>`;
  // ADD ROW TO TABLE
  studentTableBody.appendChild(row);
  // RESET FORM
  studentForm.reset();
});
