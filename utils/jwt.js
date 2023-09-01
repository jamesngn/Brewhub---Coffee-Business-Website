const jwt = require("jsonwebtoken");
const config = require("../config/config"); // Adjust the path to the config file

function generateAccessToken(userId) {
  const accessToken = jwt.sign({ userId: userId }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresIn,
  });
  return accessToken;
}

function generateRefreshToken(userId) {
  const refreshToken = jwt.sign({ userId }, config.jwt.refreshKey);
  return refreshToken;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
