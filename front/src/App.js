import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState({});

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser({});
  };

  return (
    <div className="App">
      {!user.name && <Login handleLogin={handleLogin} />}
      {user.name && user.token && <Dashboard user={user} handleLogout={handleLogout} />}
    </div>
  );
}

export default App;
