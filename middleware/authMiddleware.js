const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, config.jwt.secretKey);
    // Add the user ID from the token to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

const authoriseAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Admin authorization required." });
  }
};

module.exports = { authenticateUser, authoriseAdmin };
