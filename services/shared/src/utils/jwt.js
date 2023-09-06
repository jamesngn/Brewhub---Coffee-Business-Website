const jwt = require("jsonwebtoken");
const config = require("../config/config"); // Adjust the path to the config file
function generateAccessToken(user) {
  const accessToken = jwt.sign(user, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresIn,
  });
  return accessToken;
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, config.jwt.refreshKey);
  return refreshToken;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
