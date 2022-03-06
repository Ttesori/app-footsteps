import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('fs-user')) {
      const user = JSON.parse(localStorage.getItem('fs-user'));
      setUser(user);
    }
  }, []);


  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('fs-user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('fs-user');
  };

  return (
    <div className="App">
      {!user.name && <Login handleLogin={handleLogin} />}
      {user.name && user.token && <Dashboard user={user} handleLogout={handleLogout} />}
    </div>
  );
}

export default App;
