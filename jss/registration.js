
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".register-form");

    const emailInput = document.querySelector('input[name="email"]');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm-password"]');

    const registerButton = document.querySelector(".register-btn");

    // Create an error message under an input
    function showError(input, message) {
        input.classList.add("input-error");

        // Remove old error message if there is one
        const oldError = input.nextElementSibling;
        if (oldError && oldError.classList.contains("error-message")) {
            oldError.remove();
        }

        const error = document.createElement("span");
        error.className = "error-message";
        error.textContent = message;

        input.insertAdjacentElement("afterend", error);
    }

    // Remove error from an input
    function clearError(input) {
        input.classList.remove("input-error");

        const error = input.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.remove();
        }
    }

    // Check email
    function validateEmail() {
        const email = emailInput.value.trim();

        if (email === "") {
            showError(emailInput, "Please enter your email.");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showError(emailInput, "Please enter a valid email.");
            return false;
        }

        clearError(emailInput);
        return true;
    }

    // Check username
    function validateUsername() {
        const username = usernameInput.value.trim();

        if (username === "") {
            showError(usernameInput, "Please enter a username.");
            return false;
        }

        if (username.length < 3) {
            showError(usernameInput, "Username must be at least 3 characters.");
            return false;
        }

        clearError(usernameInput);
        return true;
    }

    // Check password
    function validatePassword() {
        const password = passwordInput.value;

        if (password === "") {
            showError(passwordInput, "Please enter a password.");
            return false;
        }

        if (password.length < 6) {
            showError(passwordInput, "Password must be at least 6 characters.");
            return false;
        }

        clearError(passwordInput);
        return true;
    }

    // Check confirm password
    function validateConfirmPassword() {
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword === "") {
            showError(confirmPasswordInput, "Please confirm your password.");
            return false;
        }

        if (confirmPassword !== passwordInput.value) {
            showError(confirmPasswordInput, "Passwords do not match.");
            return false;
        }

        clearError(confirmPasswordInput);
        return true;
    }

    // Validate when Register is clicked
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailValid = validateEmail();
        const usernameValid = validateUsername();
        const passwordValid = validatePassword();
        const confirmPasswordValid = validateConfirmPassword();

        if (
            emailValid &&
            usernameValid &&
            passwordValid &&
            confirmPasswordValid
        ) {
            // Everything is valid → go to the map
            window.location.href = "map.html";
        }
    });

    // Validate fields when the user leaves them
    emailInput.addEventListener("blur", validateEmail);
    usernameInput.addEventListener("blur", validateUsername);
    passwordInput.addEventListener("blur", validatePassword);
    confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

});

