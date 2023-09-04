// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./containers/Dashboard/Dashboard";
import Home from "./containers/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<ProtectedRoute component={Home} userRequired />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute component={Dashboard} adminRequired />}
        />
      </Routes>
    </Router>
  );
}

export default App;
