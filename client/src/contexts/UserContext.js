import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <UserContext.Provider value={{ userId, userRole, setUserId, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
