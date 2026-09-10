const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

form.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Error elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const successMessage = document.getElementById("successMessage");

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    successMessage.textContent = "";

    // Remove previous classes
    nameInput.classList.remove("error", "success");
    emailInput.classList.remove("error", "success");
    passwordInput.classList.remove("error", "success");
    confirmPasswordInput.classList.remove("error", "success");

    let isValid = true;

    // Name validation
    if (name === "") {
        nameError.textContent = "Name is required";
        nameInput.classList.add("error");
        isValid = false;
    } else {
        nameInput.classList.add("success");
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email is required";
        emailInput.classList.add("error");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email address";
        emailInput.classList.add("error");
        isValid = false;
    } else {
        emailInput.classList.add("success");
    }

    // Password validation
    if (password === "") {
        passwordError.textContent = "Password is required";
        passwordInput.classList.add("error");
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent =
            "Password must be at least 6 characters";
        passwordInput.classList.add("error");
        isValid = false;
    } else {
        passwordInput.classList.add("success");
    }

    // Confirm password validation
    if (confirmPassword === "") {
        confirmPasswordError.textContent =
            "Please confirm your password";
        confirmPasswordInput.classList.add("error");
        isValid = false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent =
            "Passwords do not match";
        confirmPasswordInput.classList.add("error");
        isValid = false;
    } else {
        confirmPasswordInput.classList.add("success");
    }

    // If everything is valid
    if (isValid) {
        successMessage.textContent =
            "Registration successful!";

        form.reset();

        nameInput.classList.remove("success");
        emailInput.classList.remove("success");
        passwordInput.classList.remove("success");
        confirmPasswordInput.classList.remove("success");
    }
});