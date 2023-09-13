require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  // MongoDB configuration
  mongo: {
    host: "mongodb",
    // host: "localhost",
    port: 27017,
    database: "brewhub_db",
  },

  // gRPC service configuration
  //172.17.0.1
  grpc: {
    menuServiceHost: "menu-service",
    // menuServiceHost: "localhost",
    menuServicePort: 5051,

    orderServiceHost: "order-service",
    // orderServiceHost: "localhost",
    orderServicePort: 5052,

    userServiceHost: "user-service",
    // userServiceHost: "localhost",
    userServicePort: 5053,

    authServiceHost: "auth-service-server",
    // authServiceHost: "localhost",
    authServicePort: 5054,

    promoServiceHost: "promo-service",
    // promoServiceHost: "localhost",
    promoServicePort: 5055,

    adminServiceHost: "admin-service",
    // adminServiceHost: "localhost",
    adminServicePort: 5056,

    imageServiceHost: "image-service",
    // imageServiceHost: "localhost",
    imageServicePort: 5057,
  },

  // JWT configuration
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    refreshKey: process.env.JWT_REFRESH_SECRET_KEY,
    expiresIn: "1h",
  },

  //AWS credentials
  aws: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
};
