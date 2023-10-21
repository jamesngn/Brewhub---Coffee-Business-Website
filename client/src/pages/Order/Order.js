import React from "react";
import Header from "../../components/Header/Header";
import CheckoutContainer from "../../containers/Checkout/CheckoutContainer";
// import useSocket from "../../hooks/useSocket"; // Import the useSocket hook

const Menu = ({ userId, userRole }) => {
  //   const { socket, response } = useSocket(userId, userRole); // Use the useSocket hook

  //   const [message, setMessage] = useState("");

  //   const handleSend = () => {
  //     // Send a message using the existing socket connection
  //     if (socket) {
  //       socket.emit("message", message);
  //     }
  //   };

  return (
    <div>
      <Header />
      <CheckoutContainer />
    </div>
  );
};
export default Menu;
