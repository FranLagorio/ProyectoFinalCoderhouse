import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserComponentContext = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
