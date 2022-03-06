import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
        <Routes>
          <Route index path='/*' element={<Login handleLogin={handleLogin} user={user} />} />
          <Route path='/hikes' element={<Dashboard user={user} handleLogout={handleLogout} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
