// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";
import Unauthorized from "../containers/Unauthorized";

const ProtectedRoute = ({
  component: Component,
  adminRequired = false,
  userRequired = false,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [userAuthorized, setUserAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await isAuthenticated();

        if (!response) {
          navigate("/login");
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
