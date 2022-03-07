import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('fs-user')) {
      const user = JSON.parse(localStorage.getItem('fs-user'));
      setUser(user);
    }
  }, [setUser]);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('fs-user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('fs-user');
  };


  return (
    <DataContext.Provider value={{
      user, setUser, handleLogin, handleLogout
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;