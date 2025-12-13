/**
 * User Registration Validation Script (Prompt/Alert Only)
 * All emojis have been removed. Uses a WHILE loop for each field 
 * and includes immediate cancellation if the age is under 18.
 */

// --- 1. Validation Helper Functions ---

function checkFullName(name) {
    if (!name || !name.trim()) return "Full Name is required.";
    const words = name.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2) return "Must contain at least two words.";
    return ""; 
}

function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!email || !emailRegex.test(email)) return "Invalid email format (e.g., example@domain.com).";
    return ""; 
}

function checkPassword(password) {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password)) return "Must contain at least one number.";
    if (!/[^A-Za-z0-9\s]/.test(password)) return "Must contain at least one special character.";
    return ""; 
}

function checkConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) return "Confirmation password is required.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return ""; 
}

function checkAge(age) {
    const ageValue = parseInt(age, 10);
    if (isNaN(ageValue) || ageValue < 1) return "Age cannot be zero or empty."; 
    if (ageValue < 18) return "AGE_TOO_YOUNG"; // Flag remains for internal cancellation logic
    return ""; 
}

// --- 2. Main Execution Function with Blocking Loops ---

function registerUser() {
    alert("Starting User Registration. You must provide valid input for each field to proceed.");

    let fullName, email, password, confirmPassword, age;
    let error;

    // 1. Full Name Input
    do {
        fullName = prompt("1/5. Enter Full Name (Must be 2+ words):", fullName || "");
        if (fullName === null) { alert("Registration cancelled."); return; }
        error = checkFullName(fullName);
        if (error) alert(`Full Name Error: ${error}\nPlease try again.`);
    } while (error);

    // 2. Email Input
    do {
        email = prompt("2/5. Enter Email Address (e.g., user@domain.com):", email || "");
        if (email === null) { alert("Registration cancelled."); return; }
        error = checkEmail(email);
        if (error) alert(`Email Error: ${error}\nPlease try again.`);
    } while (error);

    // 3. Password Input
    do {
        password = prompt("3/5. Enter Password:", password || "");
        if (password === null) { alert("Registration cancelled."); return; }
        error = checkPassword(password);
        if (error) alert(`Password Error: ${error}\nPlease try again.`);
    } while (error);

    // 4. Confirm Password Input
    do {
        confirmPassword = prompt("4/5. Confirm Password:", confirmPassword || "");
        if (confirmPassword === null) { alert("Registration cancelled."); return; }
        
        // Use a temporary variable to check if the main password itself has an issue.
        let mainPwError = checkPassword(password);
        let mismatchError = checkConfirmPassword(password, confirmPassword);
        
        if (mainPwError) {
             // If main password is bad, we just alert the user to fix the main password.
            alert("Please fix the main Password (3/5) before confirming.");
            error = mainPwError; // Keep loop running if main password is bad
        } else if (mismatchError) {
             // If main password is good but confirmation is bad
            alert(`Confirm Password Error: ${mismatchError}\nPlease try again.`);
            error = mismatchError;
        } else {
            error = ""; // Valid
        }
    } while (error);
    
    // 5. Age Input and Immediate Cancellation
    do {
        age = prompt("5/5. Enter Age (Must be 18 or older):", age || "");
        if (age === null) { alert("Registration cancelled."); return; }
        error = checkAge(age);
        
        if (error === "AGE_TOO_YOUNG") {
            // Immediate cancellation logic
            alert("Sorry, you have to be 18 years or above to register. Registration is cancelled.");
            return; // EXIT the function immediately
        }
        
        if (error) {
            // General age input error 
            alert(`Age Input Error: Age must be a valid number 1 or above.\nPlease try again.`);
        }
    } while (error);


    // --- Final Success Feedback ---
    alert(`SUCCESS! Registration Complete for ${fullName}.`);
}

// Execute the function to start the process
registerUser();