// ProtectedRoute.js
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";
import Unauthorized from "../containers/Unauthorized";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({
  component: Component,
  adminRequired = false,
  userRequired = false,
}) => {
  const navigate = useNavigate();
  const { userId, userRole, setUserId, setUserRole } = useContext(UserContext); // Access userId and userRole directly from context

  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status when the component mounts
  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await isAuthenticated();

        if (!response) {
          navigate("/");
        } else {
          setUserId(response.userId);
          setUserRole(response.role);
          setAdminAuthorized(
            !adminRequired || (adminRequired && response.role === "admin")
          );
          setUserAuthorized(
            !userRequired || (userRequired && response.role === "user")
          );
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Handle the error, e.g., redirect to an error page
        // navigate("/error");
      } finally {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, [navigate, adminRequired]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adminAuthorized || !userAuthorized) {
    return <Unauthorized />; // Handle unauthorized access
  }

  return <Component userId={userId} userRole={userRole} />;
};

export default ProtectedRoute;
