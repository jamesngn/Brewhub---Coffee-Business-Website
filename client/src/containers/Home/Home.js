import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSocket from "../../hooks/useSocket"; // Import the useSocket hook
import OrderForm from "../../components/OrderForm";

const Home = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole); // Use the useSocket hook

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <OrderForm userId={userId} userRole={userRole} />
    </div>
  );
};

export default Home;
