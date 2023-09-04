const http = require("http");
const server = http.createServer((req, res) => {});

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

// Create a map to store WebSocket connections by userId
const socketMap = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  const userRole = socket.handshake.query.userRole;

  console.log(`WebSocket conntected with userId: ${userRole} - ${userId}`);

  // Store the socket connection with the userId for identity
  socketMap.set(userId, { socket, role: userRole });

  socket.on("message", (data) => {
    console.log(`Received message from userId ${userId}:`, data);

    if (userRole === "user") {
      broadcastToAdmins(data);
      const userSocket = socketMap.get(userId);
      if (userSocket && userSocket.socket) {
        userSocket.socket.emit(
          "message",
          `Server has already received ${data}`
        );
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`WebSocket disconnected for userId: ${userRole} -  ${userId}`);
    // Remove the socket connection from the map when a client disconnects
    socketMap.delete(userId);
  });
});

function broadcastToAdmins(data) {
  // Loop through socketMap and send data to all admin sockets
  for (const [userId, { socket, role }] of socketMap) {
    if (role === "admin") {
      socket.emit("message", data);
    }
  }
}

server.listen(8080, () => {
  console.log("WebSocket server is running on port 8080");
});
