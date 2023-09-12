//unit testing framework
const { expect } = require("chai");

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../services/auth-service/auth.proto";
const authPackageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
// Load the gRPC objects for different services
const authGrpcObject = grpc.loadPackageDefinition(authPackageDef);

const path = require("path");
const config = require(path.join(
  __dirname,
  "..",
  "services",
  "shared",
  "src",
  "config",
  "config.js"
));
const authHost = config.grpc.authServiceHost;
const authPort = config.grpc.authServicePort;

const authClient = new authGrpcObject.authPackage.AuthService(
  authHost + ":" + authPort,
  grpc.credentials.createInsecure()
);

describe("auth-service", () => {
  describe("loginUser", () => {
    it("should return failed message if user does not exist", async () => {
      const request = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      const response = await new Promise((resolve) => {
        authClient.loginUser(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message: "Invalid credentials",
        token: "",
      });
    });

    it("should return successful message if user exists", async () => {
      const request = {
        email: "user@example.com",
        password: "quang123",
      };

      const response = await new Promise((resolve) => {
        authClient.loginUser(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response.success).to.be.true;
      expect(response.response.message).to.equal("Logged in successfully");
      expect(response.response.token).not.to.be.null;
    });
  });
});
