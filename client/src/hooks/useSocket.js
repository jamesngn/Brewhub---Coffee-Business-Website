import { useEffect, useState } from "react";
import io from "socket.io-client";
const config = require("../config.json");

const useSocket = (userId, userRole) => {
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socketInstance = io(`http://${config.publicIpAddress}:8000`, {
      query: { userId, userRole },
    });

    socketInstance.on("connect", () => {
      console.log(`Websocket connected with userId: ${userId}`);
    });

    socketInstance.on("message", handleMessage);

    setSocket(socketInstance);

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, [userId, userRole]);

  //Function to handle incoming messages
  const handleMessage = (data) => {
    setResponse(data);
  };

  return { socket, response, handleMessage };
};

export default useSocket;
