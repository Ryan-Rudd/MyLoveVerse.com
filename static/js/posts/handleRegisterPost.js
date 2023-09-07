/**
 * Calculates the strength of a password based on certain criteria.
 *
 * @param {string} password - The password to evaluate.
 * @returns {number} The password strength level:
 *   - 0: Weak
 *   - 1: Medium
 *   - 2: Strong
 */
function calculatePasswordStrength(password) {
    const minLength = 8;
    const minCharacterTypes = 3;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    if (password.length < minLength) {
        return 0;
    }

    let characterTypesCount = 0;
    if (uppercaseRegex.test(password)) characterTypesCount++;
    if (lowercaseRegex.test(password)) characterTypesCount++;
    if (digitRegex.test(password)) characterTypesCount++;
    if (specialCharRegex.test(password)) characterTypesCount++;

    if (characterTypesCount < minCharacterTypes) {
        return 1;
    }

    const dictionary = ['password', '123456', 'qwerty'];
    if (dictionary.some(commonWord => password.toLowerCase().includes(commonWord))) {
        return 1;
    }

    return 2;
}

/**
 * Updates the password strength indicator based on the input value.
 */
function updatePasswordStrength() {
    const password = passwordInput.value;
    const passwordStrength = calculatePasswordStrength(password);
    const passwordStrengthText = ['Weak', 'Medium', 'Strong'];

    const passwordStrengthElement = document.getElementById('password-strength');
    passwordStrengthElement.textContent = `Password Strength: ${passwordStrengthText[passwordStrength]}`;
    
    // Apply the appropriate CSS class to style the password strength indicator
    passwordStrengthElement.className = `password-strength-${passwordStrengthText[passwordStrength].toLowerCase()}`;
}

/**
 * Checks if an email address is valid.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

/**
 * Handles form submission for user registration.
 *
 * @param {Event} event - The form submission event.
 */
async function handleRegisterPost(event) {
    event.preventDefault();
    const formData = {
        username: document.querySelector('input[name="username"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
    };

    const passwordStrength = calculatePasswordStrength(formData.password);

    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none'; // Hide the error box initially

    if (passwordStrength <= 1) {
        errorBox.textContent = "Password strength must be medium. Please use a stronger password.";
        errorBox.style.display = 'block'; // Show the error box
        return;
    }

    if (!isValidEmail(formData.email)) {
        errorBox.textContent = "Invalid email address. Please enter a valid email.";
        errorBox.style.display = 'block';
        return;
    }

    if (formData.username.length <= 3) {
        errorBox.textContent = "Username must be longer than 3 characters.";
        errorBox.style.display = 'block';
        return;
    }

    fetch('/method/post/account/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:");
        console.log(data);
        loadingScreen.style.display = 'none';
        postData.innerHTML = data.htmlResults;
        postData.style.padding = "15px";
    })
    .catch(error => {
        console.error('Error:', error);
        loadingScreen.style.display = 'none';
    });
}


const passwordInput = document.querySelector('input[name="password"]');
passwordInput.addEventListener('input', updatePasswordStrength);

const registrationForm = document.querySelector('form');
registrationForm.addEventListener('submit', handleRegisterPost);
