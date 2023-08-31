// validation/userValidator.js

// Validate user inputs for registration
function validateUser(user) {
  const errors = [];

  if (!user.username) {
    errors.push("Username is required");
  }

  if (!user.email) {
    errors.push("Email is required");
  } else if (!isValidEmail(user.email)) {
    errors.push("Invalid email format");
  }

  if (!user.password) {
    errors.push("Password is required");
  } else if (user.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors.length === 0 ? null : errors;
}

// Validate email format using a simple regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  validateUser,
};
