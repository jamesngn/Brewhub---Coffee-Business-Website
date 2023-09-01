import React from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <div>
      <h1>My Microservices App</h1>
      <RegistrationForm />
      <LoginForm />
      {/* Add other components for menu, order, and user functionalities */}
    </div>
  );
}

export default App;
