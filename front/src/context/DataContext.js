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

  const handleFetch = async (method, addToURI = '', body = {}) => {
    try {
      const HIKES_URI = `http://localhost:5000/api/hikes${addToURI}`;
      const fetchOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : undefined
      };
      let resp = await fetch(HIKES_URI, fetchOptions);
      let respBody = await resp.json();
      if (resp.ok) {
        return respBody;
      }
    } catch (error) {
      return { error };
    }
  };


  return (
    <DataContext.Provider value={{
      user, setUser, handleLogin, handleLogout, handleFetch
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;