require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  // MongoDB configuration
  mongo: {
    host: "localhost",
    port: 27017,
    database: "brewhub_db",
  },

  // gRPC service configuration
  grpc: {
    menuServiceHost: "localhost",
    menuServicePort: 50051,
    orderServiceHost: "localhost",
    orderServicePort: 50052,
    userServiceHost: "localhost",
    userServicePort: 50053,
    authServiceHost: "localhost",
    authServicePort: 50054,
  },

  // JWT configuration
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    refreshKey: process.env.JWT_REFRESH_SECRET_KEY,
    expiresIn: "15s",
  },
};
