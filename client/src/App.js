// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import OrderManagment from "./pages/OrderManagement/OrderManagement";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import MenuManagment from "./pages/MenuManagement/MenuManagement";
import AccountManagment from "./pages/AccountManagement/AccountManagement";
import CategoryManagment from "./pages/CategoryManagement/CategoryManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/menu"
          element={<ProtectedRoute component={Menu} userRequired />}
        />
        <Route
          path="/order-now"
          element={<ProtectedRoute component={Order} userRequired />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute component={Dashboard} adminRequired />}
        />
        <Route
          path="/admin/order"
          element={<ProtectedRoute component={OrderManagment} adminRequired />}
        />
        <Route
          path="/admin/menu"
          element={<ProtectedRoute component={MenuManagment} adminRequired />}
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute component={CategoryManagment} adminRequired />
          }
        />
        <Route
          path="/admin/account"
          element={
            <ProtectedRoute component={AccountManagment} adminRequired />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
