// STUDENTS ARRAY
const students = [];
// GET FORM
const studentForm = document.getElementById("studentForm");
// GET INPUT ELEMENTS
const studentNameInput = document.getElementById("studentName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const courseInput = document.getElementById("course");
const marksInput = document.getElementById("marks");
// GET TABLE BODY
const studentTableBody = document.getElementById("studentTableBody");
// GET SUBMIT BUTTON
const submitBtn =document.getElementById("submitBtn");
// EDITING STUDENT ID
// null means we are NOT editing any student
let editingStudentId = null;
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
// DISPLAY STUDENTS

function displayStudents() {
    // Clear the existing table
    studentTableBody.innerHTML = "";
    // Loop through students array
    students.forEach(function(student) {
        // Create table row
        const row = document.createElement("tr");
        // Add student information
        row.innerHTML = `
           <td>${student.name}</td>
            <td>${student.email}</td>
             <td>${student.phone}</td>
              <td>${student.course}</td>
              <td>${student.marks}</td>
            <td>${student.grade}</td>
             <td>
                <button
                    type="button"
                    class="editBtn"
                    data-id="${student.id}">
                    Edit
                </button>
                <button
                    type="button"
                    class="deleteBtn"
                    data-id="${student.id}">
                    Delete
                </button>
            </td>

        `;
        // Add row to table
        studentTableBody.appendChild(row);
    });
}
// FORM SUBMIT
studentForm.addEventListener("submit", function(event) {
    // Prevent page refresh
    event.preventDefault();
    // ==================================================
    // GET FORM VALUES
    // ==================================================
    const name = studentNameInput.value.trim()
    const email =emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const course = courseInput.value;
    const marks =  Number(marksInput.value);
    // CALCULATE GRADE
    const grade = calculateGrade(marks);
    // CHECK WHETHER WE ARE EDITING

    if (editingStudentId !== null) {
        // FIND STUDENT
        const student =
            students.find(function(student) {
                return student.id === editingStudentId;
            });
        // UPDATE STUDENT
        if (student) {
            student.name = name;
            student.email = email;
            student.phone = phone;
            student.course = course;
            student.marks = marks;
            student.grade = grade;
            console.log("Student updated:", student);
        }
        // EXIT EDIT MODE
        editingStudentId = null;
        // Change button back
        submitBtn.textContent = "Add Student"; }
    // ADD NEW STUDENT
    
    else {
        // Create student object
        const student = {
            // Unique ID
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            course: course,
            marks: marks,
            grade: grade
        };
        // Add student to array
        students.push(student);
        console.log("Student added:", student);
    }
    // DISPLAY UPDATED DATA
    displayStudents();
    // RESET FORM
   studentForm.reset();

});

// EDIT + DELETE BUTTONS
studentTableBody.addEventListener("click", function(event) {
    // DELETE STUDENT
    if (
        event.target.classList.contains("deleteBtn")
    ) {
        // Get student ID
        const id =
            Number(event.target.dataset.id);
        // Find student index
        const studentIndex =
            students.findIndex(function(student) {
                return student.id === id;
            });
        // Check student exists
        if (studentIndex !== -1) {
    // Remove student
            students.splice(studentIndex, 1);
  console.log(  "Student deleted. Remaining students:",  students  );
 // Refresh table
            displayStudents();   }
    }
    // EDIT STUDENT
    if (
        event.target.classList.contains("editBtn")
    ) {
        // Get student ID
        const id =
            Number(event.target.dataset.id);
              // Find studen;
        const student =
            students.find(function(student) {
                return student.id === id;
            });
        // Check student exists
        if (student) {
            // PUT STUDENT DATA INTO FORM
            studentNameInput.value =student.name;
            emailInput.value =student.email;
            phoneInput.value =student.phone;
            courseInput.value = student.course;
            marksInput.value =student.marks;
            // SAVE EDITING STUDENT ID
          editingStudentId = student.id;
            // CHANGE BUTTON
            submitBtn.textContent =  "Update Student";
            // Put cursor in name field
            studentNameInput.focus();
            console.log(   "Editing student:",  student );
        } }
});

