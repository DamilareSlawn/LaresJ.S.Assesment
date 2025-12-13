/**
 * User Registration Validation Script (Prompt/Alert Only)
 * Uses a WHILE loop for each field to enforce validation rules before proceeding.
 */

// --- 1. Validation Helper Functions (Returns error message or "") ---

function checkFullName(name) {
    if (!name || !name.trim()) return "Full Name is required.";
    // Rule: contain at least 2 words.
    const words = name.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2) return "Must contain at least two words.";
    return ""; // Valid
}

function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!email || !emailRegex.test(email)) return "Invalid email format (e.g., example@domain.com).";
    return ""; // Valid
}

function checkPassword(password) {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password)) return "Must contain at least one number.";
    if (!/[^A-Za-z0-9\s]/.test(password)) return "Must contain at least one special character.";
    return ""; // Valid
}

function checkAge(age) {
    const ageValue = parseInt(age, 10);
    if (isNaN(ageValue) || ageValue < 18) return "You must be 18 or older to register.";
    return ""; // Valid
}

// --- 2. Main Execution Function with Blocking Loops ---

function registerUser() {
    alert("Starting User Registration. You must provide valid input for each field to proceed.");

    let fullName, email, password, confirmPassword, age;
    let error;

    // --- 1. Full Name Input and Blocking Validation ---
    do {
        fullName = prompt("1/5. Enter Full Name (Must be 2+ words):", fullName || "");
        if (fullName === null) { alert("Registration cancelled."); return; } // User hit Cancel
        error = checkFullName(fullName);
        if (error) {
            alert(`Full Name Error: ${error}\nPlease try again.`);
        }
    } while (error); // Loop runs while error is NOT empty ("")

    // --- 2. Email Input and Blocking Validation ---
    do {
        email = prompt("2/5. Enter Email Address (e.g., user@domain.com):", email || "");
        if (email === null) { alert("Registration cancelled."); return; }
        error = checkEmail(email);
        if (error) {
            alert(`Email Error: ${error}\nPlease try again.`);
        }
    } while (error);

    // --- 3. Password Input and Blocking Validation ---
    do {
        password = prompt("3/5. Enter Password (Min 8 chars, 1 Upper, 1 Number, 1 Special):", password || "");
        if (password === null) { alert("Registration cancelled."); return; }
        error = checkPassword(password);
        if (error) {
            alert(`Password Error: ${error}\nPlease try again.`);
        }
    } while (error);

    // --- 4. Confirm Password Input and Blocking Validation ---
    do {
        confirmPassword = prompt("4/5. Confirm Password (Must match the previous password):", confirmPassword || "");
        if (confirmPassword === null) { alert("Registration cancelled."); return; }
        // The checkConfirmPassword function needs the valid 'password' from the previous step
        let confirmError = checkPassword(password) || checkConfirmPassword(password, confirmPassword);
        error = confirmError;

        if (error) {
            alert(`Confirm Password Error: ${error}\nPlease try again.`);
        }
    } while (error);
    
    // --- 5. Age Input and Blocking Validation ---
    do {
        age = prompt("5/5. Enter Age (Must be 18 or older):", age || "");
        if (age === null) { alert("Registration cancelled."); return; }
        error = checkAge(age);
        if (error) {
            alert(`Age Error: ${error}\nPlease try again.`);
        }
    } while (error);


    // --- Final Success Feedback ---
    alert(`✅ SUCCESS! Registration Complete for ${fullName}.\n\nThank you for registering!`);
}

// Execute the function to start the process
registerUser();