import React, { useState } from "react";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import MenuContainer from "../../containers/MenuContainer/MenuContainer";
import useSocket from "../../hooks/useSocket"; // Import the useSocket hook

const Menu = ({ userId, userRole }) => {
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
      <Header />
      <SearchBar />
      <MenuContainer />
    </div>
  );
};
export default Menu;
