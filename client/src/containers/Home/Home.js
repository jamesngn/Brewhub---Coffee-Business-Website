import React, { useState } from "react";

import Logout from "../../components/Logout";
import MenuContainer from "../Menu/MenuContainer";
import useSocket from "../../hooks/useSocket"; // Import the useSocket hook

const Home = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole); // Use the useSocket hook

  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Send a message using the existing socket connection
    if (socket) {
      socket.emit("message", message);
    }
  };

  return (
    <div>
      <h2>Welcome, User ID: {userId} </h2>
      {/* Add home content here */}
      <h1>WebSocket Test</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <div>
        <strong>Server Response:</strong> {response}
      </div>
      <Logout />
      <MenuContainer />
    </div>
  );
};

export default Home;
