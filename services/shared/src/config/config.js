require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  // MongoDB configuration
  mongo: {
    // host: "mongodb",
    host: "172.31.31.248 ",
    port: 27017,
    database: "brewhub_db",
  },

  // gRPC service configuration
  //172.17.0.1
  grpc: {
    // menuServiceHost: "menu-service-server",
    menuServiceHost: "172.31.31.248 ",
    menuServicePort: 5051,

    // orderServiceHost: "order-service-server",
    orderServiceHost: "172.31.31.248 ",
    orderServicePort: 5052,

    // userServiceHost: "user-service-server",
    userServiceHost: "172.31.31.248 ",
    userServicePort: 5053,

    // authServiceHost: "auth-service-server",
    authServiceHost: "172.31.31.248 ",
    authServicePort: 5054,

    // promoServiceHost: "promo-service-server",
    promoServiceHost: "172.31.31.248 ",
    promoServicePort: 5055,

    // adminServiceHost: "admin-service-server",
    adminServiceHost: "172.31.31.248 ",
    adminServicePort: 5056,

    // imageServiceHost: "image-service-server",
    imageServiceHost: "172.31.31.248 ",
    imageServicePort: 5057,
  },

  // JWT configuration
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    refreshKey: process.env.JWT_REFRESH_SECRET_KEY,
    expiresIn: "1h",
  },
};
